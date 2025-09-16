import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native"; // <- correto (named)
import AuthNavigator from "./AuthNavigator";   // <- default
import AppNavigator from "./AppNavigator";     // <- default
import { AuthContext } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function RootNavigator() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
