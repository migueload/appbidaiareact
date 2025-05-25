import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapaWeb = ({ latitud, longitud, nombreHotel }) => {
  const lat = parseFloat(latitud);
  const lng = parseFloat(longitud);

  if (isNaN(lat) || isNaN(lng)) {
    return null; // No renderiza nada si no hay coordenadas válidas
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            border: none;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <iframe
          src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"
          allowfullscreen
          loading="lazy">
        </iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  webview: {
    flex: 1,
  },
});

export default MapaWeb;
