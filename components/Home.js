import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";


export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [searchText, setSearchText] = useState("");
  const [states, setStates] = useState([]); // Lista filtrada
  const [allStates, setAllStates] = useState([]); // Lista completa
  
  const API_CITY_URL = "https://btravelconnect.com/apihotel/index.php/Estado/getByCountry";

  useEffect(() => {
    loadCity(); // Ejecuta la función al montar la pantalla
  }, []);

  const loadCity = async () => {
    try {
      const payload = { id_pais: 19 };

      const response = await fetch(API_CITY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const transformedData = data.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        country: "Venezuela",
      }));

      setStates(transformedData); // Establece los estados iniciales filtrados
      setAllStates(transformedData); // Mantén una copia de respaldo
    } catch (error) {
      console.error("Error fetching cities: ", error);
    }
  };



  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
    loadCity();
  };

  const filterCities = (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setStates(allStates);
    } else {
      const filtered = allStates.filter((state) =>
        state.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setStates(filtered);
    }
  };

  useEffect(() => {
    loadCity();
  }, []);

  const handleCitySelect = (id, nombre) => {
    closeModal();
    if (modalType === "hotel") {
      navigation.navigate("HotelList", { id, nombre });
    } else if (modalType === "experience") {
      navigation.navigate("ExperienceList", { id, nombre });
    }
  };

  const openExperience = () => {
    navigation.navigate("ExperienciaList");
  };

  return (
    <View style={styles.container}>
      {/* Título y Botón de Cerrar */}
      <View style={styles.header}>
        <Text style={styles.title}>
          ¿Qué estás{"\n"}<Text style={styles.strong}>Buscando?</Text>
        </Text>
      </View>

      {/* Botones de Tours y Hoteles */}
      <TouchableOpacity style={styles.card} onPress={() => openExperience()}>
        <ImageBackground
          source={require("../assets/images/home/tour.jpg")}
          style={styles.cardBackground}
          imageStyle={styles.imageBackground}
        >
        <Text style={styles.overlay}>Tours</Text>
        <Text style={styles.subTitle}>Selecciona tu tour favorito</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => openModal("hotel")}>
        <ImageBackground
          source={require("../assets/images/home/hotel.jpg")}
          style={styles.cardBackground}
          imageStyle={styles.imageBackground}
        >
        <Text style={styles.overlay}>Hoteles</Text>
        <Text style={styles.subTitle}>Selecciona tu hospedaje de preferencia</Text>
      </ImageBackground>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo_bt.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Selecciona ciudad"
            value={searchText}
            onChangeText={filterCities}
          />
          <FlatList
            data={states}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleCitySelect(item.id, item.nombre)}
              >
                <Text style={styles.listItemText}>{item.nombre}</Text>
                <Text style={styles.listItemSubText}>{item.country}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "300",
  },
  strong: {
    fontWeight: "700",
  },
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
    color: "#000",
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  cardBackground: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    borderRadius: 10,
  },
  overlay: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subTitle: {
    fontSize: 14,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 20
  },
  logoContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  logo: {
    width: "50%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchBar: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemSubText: {
    fontSize: 14,
    color: "#888",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#273C76",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});