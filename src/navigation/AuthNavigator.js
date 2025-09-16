import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen"; // <- default import (sem chaves)

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {  // <- export default (componente)
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Entrar" }} />
    </Stack.Navigator>
  );
}
