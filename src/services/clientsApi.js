import { clientsHttp } from "./api";

export async function listClients() {
  const { data } = await clientsHttp.get("/clients");
  return data; // array
}

export async function createClient(client) {
  
  const { data } = await clientsHttp.post("/clients", client);
  alert('Registro Inserido: ' + JSON.stringify(data))
  return data;
}

export async function deleteClient(id) {
  await clientsHttp.delete(`/clients/${id}`);
}
