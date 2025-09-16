# Conteúdo

```markdown
# 📱 RN Clientes — Aplicativo React Native com Login, Cadastro e Consulta

Aplicativo didático criado em **React Native (Expo)** para demonstrar:
- Login com API pública (ReqRes),
- Persistência em API gratuita (MockAPI),
- Navegação entre telas (React Navigation),
- CRUD básico de clientes.

---

## ✨ Funcionalidades

- **Login** (gera token via ReqRes).
- **Home** com navegação para Clientes e Novo Cliente.
- **Lista de Clientes**: busca registros na MockAPI, mostra em lista e permite excluir.
- **Cadastro de Cliente**: formulário para criar novos registros.

---

## 🧭 Fluxo do App

![Fluxo do App](docs/fluxo-app.png)

1. **LoginScreen** → autenticação.
2. Se sucesso → **HomeScreen**.
3. A partir da Home:
   - Acessar **ClientsListScreen** (lista/exclusão),
   - Acessar **ClientFormScreen** (cadastro).

---

## 🗂 Arquitetura de Pastas

![Arquitetura](docs/arquitetura.png)

```

src/
components/      # componentes reutilizáveis
contexts/        # AuthContext (token e login/logout)
navigation/      # navegadores (Auth, App, Root)
screens/         # telas principais
services/        # chamadas HTTP (auth + clientes)
utils/           # utilitários opcionais
App.js             # ponto de entrada

````

---

## 🚀 Como rodar

1. **Instalar dependências**
```bash
npm install
````

2. **Instalar bibliotecas adicionais**

```bash
npm i @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npm i axios @react-native-async-storage/async-storage
```

3. **Configurar APIs**

* **ReqRes** (login) → precisa de `x-api-key` (gerar em [reqres.in](https://reqres.in/signup))
* **MockAPI** (clientes) → criar recurso `clients` no dashboard e copiar endpoint exato.

4. **Rodar**

```bash
npm start
```

Use **Expo Go** no celular ou emulador.

---

## 🔑 Serviços HTTP

**Login (ReqRes)**
`POST /login` com body:

```json
{ "email": "eve.holt@reqres.in", "password": "cityslicka" }
```

**Clientes (MockAPI)**

* `GET /clients` → lista
* `POST /clients` → cria
* `DELETE /clients/:id` → exclui

---

## 🩹 Erros comuns

* **Missing API key (ReqRes)** → adicionar header `x-api-key`.
* **404 Not Found (MockAPI)** → endpoint incorreto ou nome do recurso diferente (verifique no dashboard).
* **Invalid element type** → corrigir export/import (use `export default` nas telas e `import Tela from "..."` sem chaves).
* **Unable to resolve './src/contexts/AuthContext'** → conferir nome do arquivo/pasta (case-sensitive) e limpar cache:

  ```bash
  npx expo start -c
  ```

---

## 📄 Licença

Uso educacional — livre para adaptação em sala de aula.

```
