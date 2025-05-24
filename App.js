import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import HotelList from "./components/HotelList";
import HotelDetails from "./components/HotelDetails";
import ExperienciaList from "./components/ExperienciaList";
import ExperienciaDetails from "./components/ExperienciaDetails";
import Contacto from "./components/static/Contacto";
import Acercade from "./components/static/Acercade";
import AvisoPrivacidad from "./components/static/AvisoPrivacidad";
import Publicidad from "./components/Publicidad";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
       
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ title: '' }} />

       <Stack.Screen
        name="HotelList" 
        component={HotelList} 
        options={{ title: '' }} />

      <Stack.Screen
        name="HotelDetails" 
        component={HotelDetails} 
        options={{ title: '' }} />

      <Stack.Screen
        name="ExperienciaList" 
        component={ExperienciaList} 
        options={{ title: '' }} />

      <Stack.Screen
        name="ExperienciaDetails" 
        component={ExperienciaDetails} 
        options={{ title: '' }} />

      <Stack.Screen
        name="Contacto" 
        component={Contacto} 
        options={{ title: '' }} />

      <Stack.Screen
        name="Acercade" 
        component={Acercade} 
        options={{ title: '' }} />

      <Stack.Screen
        name="AvisoPrivacidad" 
        component={AvisoPrivacidad} 
        options={{ title: '' }} />

      <Stack.Screen
        name="Publicidad" 
        component={Publicidad} 
        options={{ title: '' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
