import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AvisoPrivacidad = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Aviso de Privacidad</Text>

      <Text style={styles.sectionTitle}>Responsable del tratamiento</Text>
      <Text style={styles.text}>
        BIDAIA.TRAVEL MX S.A. DE C.V., con domicilio en Av. Las Torres, MZA 12, L2 04, Supermanzana 514, Cancún, Benito Juárez, Quintana Roo, C.P. 77535, es responsable del tratamiento de sus datos personales. y Sucursal EDF. DON MIGUEL, AV. DON TULIO FEBRES CORDERO, PB LOCAL 37-94, 5101, Mérida, Venezuela.
      </Text>

      <Text style={styles.sectionTitle}>Finalidad del tratamiento</Text>
      <Text style={styles.text}>
        La aplicación móvil desarrollada por BIDAIA.TRAVEL MX S.A. DE C.V. tiene como propósito ofrecer servicios de información relacionados con:
      </Text>
      <Text style={styles.bullet}>• Hoteles y hospedaje</Text>
      <Text style={styles.bullet}>• Servicios turísticos y recreativos</Text>
      <Text style={styles.bullet}>• Tours y excursiones</Text>
      <Text style={styles.bullet}>• Organización de paquetes turísticos</Text>
      <Text style={styles.bullet}>• Servicios de reservaciones y asistencia en viajes</Text>

      <Text style={styles.text}>
        Los datos personales del usuario únicamente serán solicitados si el propio usuario los proporciona voluntariamente para solicitar una cotización, recibir información o contactar a un agente.
      </Text>

      <Text style={styles.sectionTitle}>Datos que podrían recabarse</Text>
      <Text style={styles.bullet}>• Nombre completo</Text>
      <Text style={styles.bullet}>• Correo electrónico</Text>
      <Text style={styles.bullet}>• Teléfono de contacto</Text>
      <Text style={styles.bullet}>• Preferencias de viaje u hospedaje</Text>

      <Text style={styles.sectionTitle}>Uso y resguardo de la información</Text>
      <Text style={styles.text}>
        La información proporcionada será utilizada exclusivamente para dar seguimiento a sus solicitudes. No será compartida con terceros sin su consentimiento, salvo en los casos permitidos por la ley.
      </Text>

      <Text style={styles.text}>
        BIDAIA.TRAVEL MX S.A. DE C.V. no solicita información sensible y no usará sus datos para fines distintos sin su autorización expresa.
      </Text>

      <Text style={styles.sectionTitle}>Derechos ARCO</Text>
      <Text style={styles.text}>
        Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales (Derechos ARCO), así como revocar su consentimiento. Puede hacerlo enviando un correo a: <Text style={styles.link}>info@bidaia.travel</Text> acompañado de una copia de su identificación oficial y una descripción clara de su solicitud.
      </Text>

      <Text style={styles.sectionTitle}>Modificaciones</Text>
      <Text style={styles.text}>
        BIDAIA.TRAVEL MX S.A. DE C.V. se reserva el derecho de modificar este aviso de privacidad en cualquier momento. Cualquier cambio será notificado a través de esta aplicación o en el sitio web oficial.
      </Text>
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
  bullet: {
    fontSize: 11,
    color: '#444',
    paddingLeft: 12,
    lineHeight: 20,
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default AvisoPrivacidad;
