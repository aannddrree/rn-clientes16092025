import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createClient } from "../services/clientsApi";

export default function ClientFormScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  const handleSave = async () => {
    setMessage("");
    if (!name || !email) {
      setMessageIsError(true);
      setMessage("Preencha pelo menos nome e email.");
      Alert.alert("Atenção", "Preencha pelo menos nome e email.");
      return;
    }
    try {
      await createClient({ name, email, phone });
      setMessageIsError(false);
      setMessage("O dado foi armazenado com sucesso!");
      Alert.alert("Dados armazenados", "O dado foi armazenado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("ClientsList") },
      ]);
    } catch (e) {
      setMessageIsError(true);
      setMessage("Não foi possível criar o cliente.");
      Alert.alert("Erro", "Não foi possível criar o cliente.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Novo Cliente</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName}
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}
        autoCapitalize="none" keyboardType="email-address"
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }} />
      <TextInput placeholder="Telefone" value={phone} onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
      {!!message && (
        <Text style={{ color: messageIsError ? "#b00020" : "#087f23", marginTop: 8 }}>
          {message}
        </Text>
      )}
    </View>
  );
}
