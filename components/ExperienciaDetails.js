import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Cotizador from '../components/Cotizador';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const ExperienciaDetails = () => {
  const route = useRoute();
  const { experience } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [experienceDetail, setExperienceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExperienceFacilities, setShowExperienceFacilities] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Number(experience.experiencia.likes || 0));


  const url_image_file_experience = "https://btravelconnect.com/file/img/experiencia";
  const api_experience_detail = "https://btravelconnect.com/apihotel/index.php/experiencia/getExperienciaAppById";
  const API_SAVE_LIKE_EXPERIENCIA = "https://btravelconnect.com/apihotel/index.php/Like/save_experiencia";


 
  // Estados para el formulario
    const [formData, setFormData] = useState({
      id_hotel: experience.experiencia.id,
      hotel_name: experience.experiencia.nombre,
      adult: 1,
      child: 0,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      date_in: new Date(),
      date_out: new Date(new Date().setDate(new Date().getDate() + 1)),
      via: 'app',
      type: 'tour',
    });
   

  useEffect(() => {
    loadDetail();
    storeUUID();
  }, [experience]);

  const loadDetail = async () => {
    try {
      const payload = { id: experience.experiencia.id };
      const response = await fetch(api_experience_detail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setExperienceDetail(data);
    } catch (error) {
      console.error("Error fetching details: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrls = () =>
  experience?.imagenes_experiencia?.length > 0
    ? experience.imagenes_experiencia.map(img =>
        `${url_image_file_experience}/${img.id_exp}/${img.nombre}`
      )
    : ["https://placebeard.it/400x400"];
  


  //**Enviar Likes Experiencia */
  const sendLike = async (hotelId, uuid) => {
    try {
      const response = await fetch(API_SAVE_LIKE_EXPERIENCIA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_hotel: hotelId, user: uuid }),
      });
      const result = await response.json();
      if(result){
        Alert.alert('Like','Su like fue regsitrado con exito!');
      }else{
        Alert.alert('Like','Ya su like habia sido registrado para este tour!');
      }
      console.log("Like actualizado:", result);
    } catch (error) {
      console.error("Error al enviar like:", error);
    }
};

const handleLikePress = async () => {
  const newLikedState = !liked;
  setLiked(newLikedState);
  setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
  if (newLikedState) {
    const uuid = await AsyncStorage.getItem('user_id_tour');
    sendLike(experience.experiencia.id, uuid);
  }
};


//**Generar un uuid y guardar en localstorage*/

const generateUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
});

const storeUUID = async () => {
  try {
    const existingUUID = await AsyncStorage.getItem('user_id_tour');
    if (!existingUUID) {
      const newUUID = generateUUID();
      await AsyncStorage.setItem('user_id_tour', newUUID);
    } 
  } catch (error) {
    console.error('Error al manejar el UUID:', error);
  }
};

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#273C76" />
        <Text style={{ marginTop: 10 }}>Cargando detalles de la experiencia...</Text>
      </View>
    );
  }

  if (!experienceDetail) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <Text>Error al cargar los detalles de la experiencia</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Carrusel de imágenes */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={getImageUrls()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          )}
          onScroll={(event) => {
            const slide = Math.ceil(
              event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
            );
            if (slide !== currentIndex) {
              setCurrentIndex(slide);
            }
          }}
        />
        <View style={styles.pagination}>
          {getImageUrls().map((_, index) => (
            <Text
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index ? styles.activeDot : null,
              ]}
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>

      {/* Datos de la experiencia */}
      <Text style={styles.hotelName}>{experience?.experiencia?.nombre || 'Sin nombre'}</Text>
      <Text style={styles.subtitle}>{experience?.experiencia?.descripcion || 'Sin descripción'}</Text>
      <View style={styles.likeContainer}>
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={24}
          color={liked ? "#e74c3c" : "#273C76"}
          onPress={handleLikePress}
        />
        <Text style={styles.likeText}>{likesCount}</Text>
      </View>

      {experience?.experiencia?.estado && (
      <Text style={styles.hotelState}>
          <Text style={{ fontWeight: 'bold' }}>Estado: </Text>
          {experience.experiencia.estado}
        </Text>
      )}

      {experience?.experiencia?.categoria && (
        <Text style={styles.hotelState}>
          <Text style={{ fontWeight: 'bold' }}>Categoría: </Text>
          {experience.experiencia.categoria}
        </Text>
      )}

      {experience?.experiencia?.hora_entrada && (
        <Text style={styles.hotelState}>
          <Text style={{ fontWeight: 'bold' }}>Hora de Entrada: </Text>
          {experience.experiencia.hora_entrada}
        </Text>
      )}

      {experience?.experiencia?.hora_salida && (
        <Text style={styles.hotelState}>
          <Text style={{ fontWeight: 'bold' }}>Hora de Salida: </Text>
          {experience.experiencia.hora_salida}
        </Text>
      )}

       {/* Facilidades */}
        <View style={styles.accordionContainer}>
          <Text style={styles.accordionHeader} onPress={() => setShowExperienceFacilities(!showExperienceFacilities)}>
            {showExperienceFacilities ? '▼' : '▶'} Facilidades
          </Text>
          {showExperienceFacilities && (
            <Text style={styles.facilityText}>{experience?.experiencia?.facilidades}</Text>  
          )}
        </View>
        <Cotizador
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => {
          setConfirmationData(formData); 
          setIsConfirmationVisible(true);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  paginationDot: {
    fontSize: 10,
    color: '#ccc',
    margin: 3,
  },
  activeDot: {
    color: '#273C76',
  },
  image: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#273C76",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  hotelState: {
    fontSize: 14,
    color: "#273C76",
    marginTop: 5,
  },
  star: {
    fontSize: 16,
    color: "#FFC857",
    marginHorizontal: 2,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '75%',
    marginBottom: 10,
  },
  accordionContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  accordionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#273C76',
    marginBottom: 10,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  facilityText: {
    fontFamily: 'arial',
    fontSize: 12,
    color: '#666',
    flexShrink: 1,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 0,
  },
  likeText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#273C76',
  },
  
});

export default ExperienciaDetails;