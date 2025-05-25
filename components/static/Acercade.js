import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Acercade = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Acerca de BIDAIA.TRAVEL MX</Text>

      <Text style={styles.sectionTitle}>¿Quiénes somos?</Text>
      <Text style={styles.text}>
        BIDAIA.TRAVEL MX S.A. DE C.V. es una empresa comprometida con brindar experiencias únicas de viaje a través de tecnología, atención personalizada y un enfoque centrado en el cliente.
      </Text>

      <Text style={styles.sectionTitle}>Nuestra misión</Text>
      <Text style={styles.text}>
        Ofrecer soluciones integrales para viajeros nacionales e internacionales, facilitando la búsqueda, reservación y gestión de servicios turísticos de forma confiable, rápida y segura.
      </Text>

      <Text style={styles.sectionTitle}>Nuestra visión</Text>
      <Text style={styles.text}>
        Ser una empresa líder en innovación dentro del sector turístico digital, reconocida por su excelencia en servicio al cliente, calidad de información y compromiso con el turismo responsable.
      </Text>

      <Text style={styles.sectionTitle}>Actividades económicas</Text>
      <Text style={styles.bullet}>• Agencias de viajes</Text>
      <Text style={styles.bullet}>• Servicios de administración de negocios</Text>
      <Text style={styles.bullet}>• Otros servicios de reservaciones</Text>
      <Text style={styles.bullet}>• Organización de excursiones y paquetes turísticos</Text>
    </ScrollView>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    textAlign: 'justify',
  },
  bullet: {
    fontSize: 12,
    color: '#444',
    paddingLeft: 12,
    lineHeight: 20,
  },
  link: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default Acercade;
