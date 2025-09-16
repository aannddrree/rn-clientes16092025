import { authHttp } from "./api";

export async function loginReqRes({ email, password }) {
  // ReqRes aceita exatamente esse par email/senha para retornar token
  const { data } = await authHttp.post("/login", { email, password });
  // data = { token: "QpwL5tke4Pnpja7X4" }
  return data.token;
}
