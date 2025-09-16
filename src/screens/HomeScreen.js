import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function HomeScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Bem-vindo 👋</Text>
      <Button title="Clientes (listar)" onPress={() => navigation.navigate("ClientsList")} />
      <Button title="Novo Cliente" onPress={() => navigation.navigate("ClientForm")} />
      <View style={{ height: 16 }} />
      <Button title="Sair" color="tomato" onPress={signOut} />
    </View>
  );
}
