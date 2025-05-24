import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ConfirmationModal = ({ visible, data, onClose }) => {
  if (!data) return null;

  // Función para formatear la fecha
  const formatDate = (date) => {
    if (!date) return 'No especificada';
    
    // Si es un string, conviértelo a Date
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>¡Cotización Enviada!</Text>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Detalles del Cliente:</Text>
            <Text style={styles.detailText}>Nombre: {data.nombre} {data.apellido}</Text>
            <Text style={styles.detailText}>Email: {data.email}</Text>
            <Text style={styles.detailText}>Teléfono: {data.telefono}</Text>
            
            <Text style={styles.sectionTitle}>Detalles de la Reserva:</Text>
            <Text style={styles.detailText}>Hotel: {data.hotel_name}</Text>
            <Text style={styles.detailText}>Fecha de Entrada: {formatDate(data.date_in)}</Text>
            <Text style={styles.detailText}>Fecha de Salida: {formatDate(data.date_out)}</Text>
            <Text style={styles.detailText}>Adultos: {data.adult}</Text>
            <Text style={styles.detailText}>Niños: {data.child}</Text>
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#3498db',
  },
  detailText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#34495e',
  },
  modalContent: {
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    alignSelf: 'center',
    width: '50%',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default ConfirmationModal;