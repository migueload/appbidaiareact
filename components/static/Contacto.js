import { View, Text, StyleSheet} from 'react-native';

const Contacto = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacto</Text>
      <Text style={styles.text}>
        Direcciónes: 
      </Text>
      <Text style={styles.bullet}><Text style={styles.link}>Mexico:</Text> Av. Las Torres, MZA 12, L2 04, Supermanzana 514, Cancún, Benito Juárez, Quintana Roo, C.P. 77535</Text>
      <Text style={styles.bullet}><Text style={styles.link}>Suc. Venezuela:</Text> EDF. DON MIGUEL, AV. DON TULIO FEBRES CORDERO, PB LOCAL 37-94, 5101, Mérida, Venezuela</Text>
      
      <Text style={styles.text_email}>
        Correo electrónico: <Text style={styles.link}>info@bidaia.travel</Text>
      </Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
   screen: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  container: {
    padding: 24,
  },
   bullet: {
    fontSize: 12,
    color: '#444',
    paddingLeft: 12,
    lineHeight: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    color: '#444',
    lineHeight: 20,
    textAlign: 'justify',
  },
   text_email: {
    marginTop: 15,
    fontSize: 12,
    color: '#444',
    lineHeight: 20,
    textAlign: 'justify',
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Contacto;
