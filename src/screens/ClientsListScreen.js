import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import { listClients, deleteClient } from "../services/clientsApi";
import ClientItem from "../components/ClientItem";

export default function ClientsListScreen() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    setRefreshing(true);
    try {
      const list = await listClients();
      setData(list);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os clientes.");
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setData((prev) => prev.filter((c) => c.id !== id));
    } catch {
      Alert.alert("Erro", "Falha ao excluir.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>Clientes</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ClientItem client={item} onDelete={handleDelete} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        ListEmptyComponent={<Text>Nenhum cliente cadastrado.</Text>}
      />
    </View>
  );
}
