import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Publicidad = () => {
  const route = useRoute();
  const { publicidad } = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image
        source={{ uri: publicidad.url_imagen }}
        style={styles.adImage}
        resizeMode="cover"
      />
      <Text style={styles.title}>{publicidad.titulo}</Text>
      <Text style={styles.subtitle}>{publicidad.subtitulo}</Text>
      <Text style={styles.description}>{publicidad.descripcion}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  adImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'justify',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
});

export default Publicidad;
