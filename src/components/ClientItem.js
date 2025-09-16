import React from "react";
import { View, Text, Button } from "react-native";

export default function ClientItem({ client, onDelete }) {
  return (
    <View style={{
      borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8,
      flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    }}>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={{ fontWeight: "600" }}>{client.name}</Text>
        <Text>{client.email}</Text>
        <Text>{client.phone}</Text>
      </View>
      <Button title="Excluir" color="tomato" onPress={() => onDelete(client.id)} />
    </View>
  );
}
