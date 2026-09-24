import axios from "axios";

// 👉 Troque para a sua URL do MockAPI:
export const MOCKAPI_BASE = "https://6ab558bf24ee9d3caa1c6927.mockapi.io/api/v1/dados";

// Cliente Axios para MockAPI (clientes)
export const clientsHttp = axios.create({
  baseURL: MOCKAPI_BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Cliente Axios para ReqRes (login)
export const authHttp = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 10000,
  headers: {
    "x-api-key": "reqres-free-v1",
    "Content-Type": "application/json",
  },
});
