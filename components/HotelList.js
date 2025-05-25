import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuSlide from "../components/MenuSlide";

const HotelList = ({ route, navigation }) => {
  const { id, nombre } = route.params;
  const [hotels, setHotels] = useState([]);
  const [banner, setBanner] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAd, setShowAd] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const country_id = 19;

  const api_hotel_city = "https://btravelconnect.com/apihotel/index.php/hotel/getAllByCityHotelApp";
  const url_image_file_hotel = "https://btravelconnect.com/file/img/hotel";
  const url_image_banner = "https://btravelconnect.com/assets/images/publicidad.png";
  const api_banner_publicidad = "https://btravelconnect.com/apihotel/index.php/publicidad/get";

  useEffect(() => {
    fetchHotels();
    fetchBanner();
  }, []);

  const fetchHotels = async () => {
    try {
      const payload = {
        country: country_id,
        state: id,
        from: "",
        to: "",
      };

  const response = await fetch(api_hotel_city, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setHotels(data);
      setFilteredHotels(data);
    } catch (error) {
      console.error("Error al cargar los hoteles:", error);
    }
  };


  const filterHotels = (text) => {
    setSearchQuery(text);
  
    if (text.trim() === "") {
      setFilteredHotels(hotels); 
    } else {
      const filtered = hotels.filter(
        (hotel) =>
          hotel.hotel?.nombre && 
          hotel.hotel.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  };
  

   //***Api consulta banner publicitario****
  const fetchBanner = async () => {
    try {
      const response = await fetch(api_banner_publicidad, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.length > 0 && data[0].status === "1") {
        setBanner(data[0]);
      } else {
        setBanner(null); 
      }
    } catch (error) {
      console.error("Error al cargar la informacion del banner:", error);
    }
  };

  const getImageUrl = (hotel) => {
    return hotel.imagen_url
      ? `${url_image_file_hotel}/${hotel.hotel.id}/${hotel.imagen_url.nombre}`
      : "https://placehold.co/400x400";
  };

  const getStars = (numero) => {
    if (numero < 1 || numero > 5) {
      return null; 
    }
    return Array.from({ length: numero }).map((_, index) => (
      <Ionicons
        key={index}
        name="star"
        size={20}
        style={styles.star}
      />
    ));
  };

   const [menuVisible, setMenuVisible] = useState(false);
  
  return (
    <View style={styles.container}>

      {/* Botón Hamburguesa */}
      <TouchableOpacity
       onPress={() => setMenuVisible(!menuVisible)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "#fff",
          padding: 5,
          borderRadius: 25,
          elevation: 5,
        }}
      >
       <Ionicons name="menu" size={20} color="#273C76" />
      </TouchableOpacity>
       {/* Menú Slide */}
      <MenuSlide visible={menuVisible} onClose={() => setMenuVisible(false)} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hoteles en {nombre}</Text>
        <Text style={styles.dateText}>
          Hoy: {new Date().toLocaleDateString()}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#A4A4A4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar hoteles..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={filterHotels}
        />
      </View>

     {showBanner && banner && (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{uri: banner.url_imagen}}
            style={styles.adImage}
            resizeMode="cover"
          />
          <Text style={styles.title}>{banner.titulo}</Text>
          <Text style={styles.description}>{banner.subtitulo}</Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() =>
              navigation.navigate("Publicidad", { publicidad: banner })
            }>
            <Text style={styles.linkText}>Conoce más</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo_bt_small.jpg")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButtonBanner}
          onPress={() => setShowBanner(false)}
        >
          <Text style={styles.closeTextBanner}>X</Text>
        </TouchableOpacity>
      </View>
    )}


      {/* Hotel List */}
      <FlatList
          data={filteredHotels}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.id || index.toString()}
              style={styles.card_hotel}
              onPress={() =>
                navigation.navigate("HotelDetails", { hotel: item })
              }
            >
              <Image
                source={{ uri: getImageUrl(item) }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cardContent_hotel}>
                <Text style={styles.hotelName}>{item.hotel?.nombre}</Text>
                <Text style={styles.hotelState}>Estado: {item.hotel?.estado}</Text>
                <View style={styles.starContainer}>
                  {getStars(item.hotel?.categoria)}
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
        />

  

      {/* Publicidad fija */}
      {showAd && (
        <View style={styles.advertisement}>
          <Image
            source={{uri: url_image_banner}} // Ruta a tu GIF
            style={styles.adImage_publicidad}
            resizeMode="cover" // Ajusta cómo se muestra el GIF
          />
          <TouchableOpacity
            style={styles.closeButtonPubli}
            onPress={() => setShowAd(false)}
          >
            <Text style={styles.closeTextPubli}>X</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#273C76",
    padding: 16,
  },
  headerText: {
    fontSize: 18,
     fontWeight: "bold",
    color: "#ffffff",
  },
  dateText: {
    fontSize: 12,
    color: "#BDBDBD",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 180,
  },
  hotelName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#273C76",
  },
  hotelState: {
    fontSize: 12,
    color: "#261250",
    marginTop: 5,
  },

  hotelDiscount: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  discountPrice: {
    textDecorationLine: "line-through",
    color: "#ff5a5f",
  },
  star: {
    fontSize: 16,
    color: "#FFC857",
    marginHorizontal: 2
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '75%',
  },
  location:{
    marginTop: -25,
    marginLeft: '95%',
    color: "#D8D8D8",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchBarModal: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
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
  advertisement: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: '85%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  adImage: {
    width: "100%",
    height: 100, // Ajusta la altura del banner según sea necesario
  },
  adImage_publicidad: {
    width: "100%",
    height: 200, // Ajusta la altura del banner según sea necesario
  },
  closeButtonPubli: {
    position: "absolute",
    top: -40,
    right: 0,
    backgroundColor: "#273C76",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeTextPubli: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card_hotel: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    margin: 16,
  },
  cardContent_hotel: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: '120%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginLeft: 16,
    marginBottom: 2,
    marginRight: 16,
    marginTop: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
    marginTop: 2,
    paddingHorizontal: 16,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 2,
    marginBottom: 16,
  },
  description: {
    fontSize: 10,
    color: '#666',
    paddingHorizontal: 16,
    marginTop: 1,
  },
  linkText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
    paddingHorizontal: 5,
  },
  arrow: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginLeft: '70%',
    marginTop: -30,
  },
  logo: {
    width: "100%",
  },

  closeButtonBanner: {
    position: "absolute",
    top: -5,
    right: 0,
    backgroundColor: "#848484",
    borderRadius: 20,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeTextBanner: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HotelList;
