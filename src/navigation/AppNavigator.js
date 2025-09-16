import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ClientsListScreen from "../screens/ClientsListScreen";
import ClientFormScreen from "../screens/ClientFormScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Stack.Screen name="ClientsList" component={ClientsListScreen} options={{ title: "Clientes" }} />
      <Stack.Screen name="ClientForm" component={ClientFormScreen} options={{ title: "Novo Cliente" }} />
    </Stack.Navigator>
  );
}
