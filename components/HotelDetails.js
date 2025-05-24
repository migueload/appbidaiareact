import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator, FlatList, Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import Cotizador from '../components/Cotizador';
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenWidth = Dimensions.get('window').width;

const HotelDetails = () => {
  const route = useRoute();
  const { hotel } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hotelDetail, setHotelDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRoomFacilities, setShowRoomFacilities] = useState(false);
  const [showHotelFacilities, setShowHotelFacilities] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Number(hotel.hotel.likes || 0));

  const url_image_file_hotel = "https://btravelconnect.com/file/img/hotel";
  const api_hotel_detail = "https://btravelconnect.com/apihotel/index.php/hotel/getHotelAppById";
  const API_SAVE_LIKE_HOTEL = "https://btravelconnect.com/apihotel/index.php/Like/save_hotel";


  // Estados para el formulario
  const [formData, setFormData] = useState({
    id_hotel: hotel.hotel.id,
    hotel_name: hotel.hotel.nombre,
    adult: 1,
    child: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    date_in: new Date(),
    date_out: new Date(new Date().setDate(new Date().getDate() + 1)),
    via: 'app',
    type: 'hotel',
  });
 
  useEffect(() => {
    loadDetail();
    storeUUID();
  }, [hotel]);

  const loadDetail = async () => {
    try {
      const payload = { id: hotel.hotel.id };
      const response = await fetch(api_hotel_detail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setHotelDetail(data[0]);
    } catch (error) {
      console.error("Error fetching details: ", error);
    } finally {
      setLoading(false);
    }
  };
 
  const getImageUrls = () => {
      return hotelDetail?.imagen?.length
        ? hotelDetail.imagen.map(img => `${url_image_file_hotel}/${hotel.hotel.id}/${img.nombre}`)
        : ["https://placebeard.it/400x400"];
  };

  const getStars = (numero) => {
    if (numero < 1 || numero > 5) return null;
      return Array.from({ length: numero }).map((_, index) => (
        <Ionicons key={index} name="star" size={20} style={styles.star} />
      ));
  };


  //**Enviar Likes de Hotel*/
  const sendLike = async (hotelId, uuid) => {
    try {
      const response = await fetch(API_SAVE_LIKE_HOTEL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_hotel: hotelId, user: uuid }),
      });
      const result = await response.json();
      if(result){
        Alert.alert('Like','Su like fue regsitrado con exito!');
      }else{
        Alert.alert('Like','Ya su like habia sido registrado para este hotel!');
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
    const uuid = await AsyncStorage.getItem('user_id_hotel');
    sendLike(hotel.hotel.id, uuid);
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
    const existingUUID = await AsyncStorage.getItem('user_id_hotel');
    if (!existingUUID) {
      const newUUID = generateUUID();
      await AsyncStorage.setItem('user_id_hotel', newUUID);
    } 
  } catch (error) {
    console.error('Error al manejar el UUID:', error);
  }
};


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#273C76" />
        <Text style={{ marginTop: 10 }}>Cargando detalles del hotel...</Text>
      </View>
    );
  }

    if (!hotelDetail) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <Text>Error al cargar los detalles del hotel.</Text>
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

      {/* Datos del hotel */}
      <View style={styles.starContainer}>{getStars(hotel?.hotel?.categoria)}</View>
      <Text style={styles.hotelName}>{hotel?.hotel?.nombre || 'Sin nombre'}</Text>
      <Text style={styles.subtitle}>{hotel?.hotel?.descripcion || 'Sin descripción'}</Text>
      <View style={styles.likeContainer}>
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={24}
          color={liked ? "#e74c3c" : "#273C76"}
          onPress={handleLikePress}
        />
        <Text style={styles.likeText}>{likesCount}</Text>
      </View>

       <Text style={styles.hotelState}>Estado: {hotel?.hotel?.estado || 'Desconocido'}</Text>
       {hotel?.hotel?.hora_entrada && (
       <Text style={styles.hotelState}>
          <Text style={{ fontWeight: 'bold' }}>Hora de Entrada: </Text>
          {hotel.hotel.hora_entrada}
        </Text>
      )}

      {hotel?.hotel?.hora_salida && (
        <Text style={styles.hotelState}>
          <Text style={{ fontWeight: 'bold' }}>Hora de Salida: </Text>
          {hotel.hotel.hora_salida}
        </Text>
      )}

      {/* Facilidades del hotel */}
      <View style={styles.accordionContainer}>
        <Text style={styles.accordionHeader} onPress={() => setShowHotelFacilities(!showHotelFacilities)}>
          {showHotelFacilities ? '▼' : '▶'} Facilidades del hotel
        </Text>
        {showHotelFacilities && (
          <View style={styles.facilitiesGrid}>
            {hotelDetail?.facilidades_hotel?.map((item, index) => (
              <View key={index} style={styles.facilityItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.facilityText}>{item.descripcion}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      {/* Facilidades de la habitación */}
      <View style={styles.hotelName}>
        <Text style={styles.accordionHeader} onPress={() => setShowRoomFacilities(!showRoomFacilities)}>
          {showRoomFacilities ? '▼' : '▶'} Facilidades de la habitación
        </Text>
        {showRoomFacilities && (
          <View style={styles.facilitiesGrid}>
            {hotelDetail?.facilidades_habitacion?.map((item, index) => (
              <View key={index} style={styles.facilityItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.facilityText}>{item.descripcion}</Text>
              </View>
            ))}
          </View>
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
  like: {
    fontSize:12,
    fontWeight: "bold",
    color: "#273C76",
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
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '50%',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 6,
  },
  facilityText: {
    fontSize: 12,
    color: '#444',
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

export default HotelDetails;