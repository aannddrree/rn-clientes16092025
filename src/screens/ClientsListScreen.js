import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, Alert, Modal, Pressable } from "react-native";
import { listClients, deleteClient } from "../services/clientsApi";
import ClientItem from "../components/ClientItem";

export default function ClientsListScreen() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [message, setMessage] = useState("");

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

  const removeClient = async (id) => {
    try {
      await deleteClient(id);
      setData((prev) => prev.filter((c) => c.id !== id));
      setClientToDelete(null);
      setMessage("Cliente excluído com sucesso.");
    } catch {
      Alert.alert("Erro", "Falha ao excluir.");
    }
  };

  const handleDelete = (id) => {
    setMessage("");
    const client = data.find((item) => item.id === id);
    setClientToDelete(client || { id });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>Clientes</Text>
      {!!message && <Text style={{ color: "#087f23", marginBottom: 12 }}>{message}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ClientItem client={item} onDelete={handleDelete} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        ListEmptyComponent={<Text>Nenhum cliente cadastrado.</Text>}
      />
      <Modal
        visible={!!clientToDelete}
        transparent
        animationType="fade"
        onRequestClose={() => setClientToDelete(null)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
          <View style={{ width: "85%", padding: 20, borderRadius: 8, backgroundColor: "white" }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
              Confirmar exclusão
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Deseja excluir {clientToDelete?.name || "este cliente"}?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 12 }}>
              <Pressable onPress={() => setClientToDelete(null)}>
                <Text style={{ padding: 10 }}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => removeClient(clientToDelete.id)}>
                <Text style={{ padding: 10, color: "#b00020", fontWeight: "600" }}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
