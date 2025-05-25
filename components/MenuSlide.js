import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const url_image_logo = "../assets/images/logo_bt_small.jpg";

const screenWidth = Dimensions.get("window").width;

const MenuSlide = ({ visible, onClose }) => {
  const navigation = useNavigation();

  if (!visible) return null;

  const openContacto = () => {
    navigation.navigate("Contacto");
    onClose(); 
  };

  const openAvisoPrivacidad = () => {
    navigation.navigate("AvisoPrivacidad");
    onClose(); 
  };

  const openAcercade = () => {
    navigation.navigate("Acercade");
    onClose(); 
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="#273C76" />
        </TouchableOpacity>

        <View style={styles.logoContainer_slide}>
          <Image
            source={require(url_image_logo)}
            resizeMode="contain"
          />
        </View>

        <View style={styles.linea_menu} />

        <TouchableOpacity style={styles.menuItem} onPress={openAcercade}>
          <Text style={styles.menuItemText}>Acerca de</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={openAvisoPrivacidad}>
          <Text style={styles.menuItemText}>Aviso de Privacidad</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={openContacto}>
          <Text style={styles.menuItemText}>Contacto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 999,
  },
  menuContainer: {
    position: "absolute",
    right: 0,
    width: screenWidth * 0.8,
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  menuItem: {
    marginVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "arial",
  },
  logoContainer_slide: {
    alignItems: "flex-start",
  },
  linea_menu: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default MenuSlide;
