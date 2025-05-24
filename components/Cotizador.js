import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ConfirmationModal from '../components/ConfirmationModal'; 

const Cotizador = ({ formData, setFormData }) => {
  const [showPicker, setShowPicker] = useState({ entrada: false, salida: false });
  const [errors, setErrors] = useState({});
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const API_SAVE_COTIZATION= "https://btravelconnect.com/apihotel/index.php/Cotizacion/register";

  const initialFormData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    adult: 1,
    child: 0,
    date_in: new Date(),
    date_out: new Date(new Date().setDate(new Date().getDate() + 1)),
  };



  const formatDate = (date) => {
    if (!date) return 'Seleccionar fecha';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleIncrement = (field) => {
    const max = 10;
    if (formData[field] < max) handleChange(field, formData[field] + 1);
  };

  const handleDecrement = (field) => {
    const min = field === 'adult' ? 1 : 0;
    if (formData[field] > min) handleChange(field, formData[field] - 1);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.nombre) newErrors.nombre = 'Nombre requerido';
    if (!formData.apellido) newErrors.apellido = 'Apellido requerido';
    if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.telefono) newErrors.telefono = 'Teléfono requerido';
    if (!formData.date_in || !formData.date_out) {
    newErrors.fechas = 'Debe seleccionar ambas fechas';
    } else if (new Date(formData.date_out) <= new Date(formData.date_in)) {
    newErrors.fechas = 'La fecha de salida debe ser posterior a la de entrada';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      valid = false;
    } else {
      setErrors({});
    }

    return valid;
  };

    //*** Envio de Cotizacion ****
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(API_SAVE_COTIZATION, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setConfirmationData(formData);
        setIsConfirmationVisible(true);
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching details: ", error);
      } finally {
          setIsSubmitting(true);
          setTimeout(() => {
          setIsSubmitting(false);
          }, 1000);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cotizar Reserva</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={formData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={formData.apellido}
        onChangeText={(text) => handleChange('apellido', text)}
      />
      {errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Teléfono"
        style={styles.input}
        value={formData.telefono}
        onChangeText={(text) => handleChange('telefono', text)}
        keyboardType="phone-pad"
      />
      {errors.telefono && <Text style={styles.error}>{errors.telefono}</Text>}

      {/* Selector de adultos */}
    <Text style={styles.label}>Número de adultos</Text>
        <View style={styles.counterContainer}>
        <TouchableOpacity 
            style={[styles.counterButton, formData.adult <= 1 && styles.disabledButton]}
            onPress={() => handleDecrement('adult')}
            disabled={formData.adult <= 1}
        >
            <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{formData.adult}</Text>
        <TouchableOpacity 
            style={[styles.counterButton, formData.adul >= 10 && styles.disabledButton]}
            onPress={() => handleIncrement('adult')}
            disabled={formData.adult >= 10}
        >
            <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
        </View>
        
        {/* Selector de niños */}
        <Text style={styles.label}>Número de niños</Text>
        <View style={styles.counterContainer}>
        <TouchableOpacity 
            style={[styles.counterButton, formData.child <= 0 && styles.disabledButton]}
            onPress={() => handleDecrement('child')}
            disabled={formData.child <= 0}
        >
        <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{formData.child}</Text>
        <TouchableOpacity 
            style={[styles.counterButton, formData.child >= 10 && styles.disabledButton]}
            onPress={() => handleIncrement('child')}
            disabled={formData.child >= 10}
        >
            <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
        </View>
         

      

      <TouchableOpacity onPress={() => setShowPicker({ ...showPicker, entrada: true })}>
        <Text style={styles.dateText}>Fecha Entrada: {formatDate(formData.date_in)}</Text>
      </TouchableOpacity>
      {showPicker.entrada && (
        <DateTimePicker
          value={formData.date_in}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowPicker({ ...showPicker, entrada: false });
            if (date) handleChange('date_in', date);
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowPicker({ ...showPicker, salida: true })}>
        <Text style={styles.dateText}>Fecha Salida: {formatDate(formData.date_out)}</Text>
      </TouchableOpacity>
      {showPicker.salida && (
        <DateTimePicker
          value={formData.date_out}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowPicker({ ...showPicker, salida: false });
            if (date) handleChange('date_out', date);
          }}
        />
      )}
      {errors.fechas && <Text style={styles.error}>{errors.fechas}</Text>}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Enviar Cotización</Text>
      </TouchableOpacity>

      <ConfirmationModal
                visible={isConfirmationVisible}
                data={confirmationData}
                onClose={() => setIsConfirmationVisible(false)}
              />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  error: {
    color: '#D32F2F',
    fontSize: 13,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },


  // Estilos para los contadores
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  counterButton: {
    backgroundColor: '#273C76',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  dateText: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  submitButton: {
    backgroundColor: '#273C76',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default Cotizador;
