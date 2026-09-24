import { clientsHttp } from "./api";

export async function listClients() {
  const { data } = await clientsHttp.get("");
  return data; // array
}

export async function createClient(client) {
  const { data } = await clientsHttp.post("", client);
  return data;
}

export async function deleteClient(id) {
  await clientsHttp.delete(`/${id}`);
}
