# RV Clientes: tutorial de React Native com Expo

Este projeto é uma aplicação didática para cadastro e consulta de clientes. Ele foi construído com **React Native**, **Expo**, **React Navigation** e **Axios**.

O objetivo deste README é explicar como a aplicação funciona e servir como um roteiro de estudo para alunos.

## 1. O que a aplicação faz

O usuário percorre este fluxo:

1. Informa email e senha na tela de login.
2. A aplicação envia os dados para a API ReqRes.
3. Se o login funcionar, um token é salvo no dispositivo.
4. O usuário acessa a tela inicial.
5. Na tela de clientes, pode consultar e excluir registros.
6. Na tela de novo cliente, pode cadastrar nome, email e telefone.

Os dados dos clientes são armazenados na API MockAPI. Portanto, eles continuam disponíveis mesmo quando o aplicativo é fechado, pois não ficam somente na memória do celular.

## 2. Tecnologias utilizadas

- **React Native**: criação de telas para Android, iOS e Web.
- **Expo**: ferramentas para executar e testar o aplicativo.
- **React Navigation**: navegação entre telas.
- **Axios**: realização de requisições HTTP.
- **AsyncStorage**: armazenamento local do token de login.
- **ReqRes**: API de demonstração para autenticação.
- **MockAPI**: API de demonstração para os dados dos clientes.

## 3. Preparando o ambiente

É necessário ter Node.js e npm instalados.

Na pasta do projeto, execute:

```bash
npm install
```

Depois, inicie o Expo:

```bash
npm start
```

O terminal exibirá opções para abrir o projeto no Expo Go, em um emulador ou no navegador. Para executar diretamente no navegador, use:

```bash
npm run web
```

## 4. Credenciais de teste

O projeto usa a conta de demonstração do ReqRes:

```text
Email: eve.holt@reqres.in
Senha: cityslicka
```

Esses dados são usados somente para obter um token de teste. Isso não representa um sistema real de usuários.

## 5. Entendendo a estrutura do projeto

```text
.
├── App.js                         # ponto de entrada do aplicativo
├── index.js                       # inicialização do Expo
├── package.json                   # dependências e scripts
└── src/
    ├── components/
    │   └── ClientItem.js          # visual de um cliente da lista
    ├── contexts/
    │   └── AuthContext.js          # estado global de autenticação
    ├── navigation/
    │   ├── AppNavigator.js         # telas disponíveis após login
    │   ├── AuthNavigator.js        # telas disponíveis sem login
    │   └── RootNavigator.js        # escolhe o navegador correto
    ├── screens/
    │   ├── ClientFormScreen.js     # formulário de cadastro
    │   ├── ClientsListScreen.js    # consulta e exclusão
    │   ├── HomeScreen.js           # tela inicial
    │   └── LoginScreen.js          # formulário de login
    ├── services/
    │   ├── api.js                  # clientes Axios e URLs base
    │   ├── authApi.js              # requisição de login
    │   └── clientsApi.js           # operações com clientes
    └── utils/
        └── validators.js           # espaço para validações futuras
```

## 6. Como o login funciona

### 6.1 Entrada da aplicação

Em `App.js`, o componente `AuthProvider` envolve o `RootNavigator`:

```jsx
<AuthProvider>
  <RootNavigator />
</AuthProvider>
```

O provider disponibiliza `token`, `loading`, `signIn` e `signOut` para qualquer tela que use `AuthContext`.

### 6.2 Escolha da navegação

`RootNavigator.js` verifica se existe um token:

- sem token: mostra `AuthNavigator`, que contém a tela de login;
- com token: mostra `AppNavigator`, que contém a área principal do aplicativo;
- enquanto verifica o armazenamento local: mostra um indicador de carregamento.

Essa separação evita que a área de clientes seja exibida antes da autenticação.

### 6.3 Salvamento do token

Quando o usuário toca em **Entrar**:

1. `LoginScreen` chama `signIn` do contexto;
2. `AuthContext` chama `loginReqRes`;
3. `authApi.js` faz `POST /login` na ReqRes;
4. o token retornado é colocado no estado com `setToken`;
5. o token também é salvo com `AsyncStorage.setItem("@token", token)`;
6. o `RootNavigator` percebe a mudança e mostra a aplicação principal.

Ao tocar em **Sair**, o token é removido do estado e do `AsyncStorage`, fazendo o usuário voltar para o login.

## 7. Como os clientes são armazenados

As requisições ficam separadas das telas. Essa organização facilita a manutenção e evita repetir URLs e configurações de Axios.

Em `src/services/api.js`, a URL usada atualmente é:

```text
https://6ab558bf24ee9d3caa1c6927.mockapi.io/api/v1/dados
```

O serviço `clientsApi.js` usa essa URL diretamente:

| Operação | Método | URL | Objetivo |
| --- | --- | --- | --- |
| Listar | `GET` | `/dados` | Busca todos os clientes |
| Criar | `POST` | `/dados` | Insere um novo cliente |
| Excluir | `DELETE` | `/dados/:id` | Remove um cliente pelo id |

O corpo enviado no cadastro tem este formato:

```json
{
  "name": "Ana Souza",
  "email": "ana@example.com",
  "phone": "11999999999"
}
```

O MockAPI cria o `id` e a data de criação automaticamente.

## 8. Cadastro de um cliente

`ClientFormScreen.js` controla três estados do formulário:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
```

Cada `TextInput` atualiza um desses valores com `onChangeText`.

Ao salvar:

1. a tela verifica se nome e email foram preenchidos;
2. chama `createClient({ name, email, phone })`;
3. espera a resposta da API com `await`;
4. mostra a mensagem de sucesso;
5. permite voltar para a lista de clientes.

Usar `await` é importante: a mensagem só deve aparecer depois que o servidor confirmar o cadastro.

## 9. Lista e exclusão de clientes

`ClientsListScreen.js` chama `listClients()` quando a tela é aberta, dentro de um `useEffect`. A resposta é guardada no estado `data` e exibida por um `FlatList`.

Cada item é renderizado pelo componente reutilizável `ClientItem.js`. Esse componente recebe:

- `client`: os dados do cliente;
- `onDelete`: a função que será chamada ao tocar em **Excluir**.

Antes de excluir, a tela mostra um modal próprio com as opções **Cancelar** e **Excluir**. A chamada `DELETE` só acontece depois da confirmação. Se a API responder com sucesso:

1. o cliente é retirado do estado local;
2. a lista é atualizada sem precisar recarregar a tela;
3. aparece a mensagem `Cliente excluído com sucesso.`

## 10. Conceitos importantes para estudar

### Estado

`useState` guarda valores que mudam durante o uso, como campos do formulário, lista de clientes e mensagens.

### Efeitos

`useEffect` executa uma ação relacionada ao ciclo de vida da tela. Neste projeto, ele carrega os clientes quando a lista é aberta.

### Context API

`AuthContext` compartilha o estado de autenticação sem precisar passar o token manualmente por várias telas.

### Promises e `async/await`

As requisições HTTP são assíncronas. `try/catch` trata sucesso e erro de forma organizada.

### Componentes reutilizáveis

`ClientItem` concentra a apresentação de um cliente. Assim, `ClientsListScreen` fica responsável pela lista e pelas regras de negócio.

### CRUD

Este projeto implementa parte de um CRUD:

- **Create**: cadastrar cliente;
- **Read**: listar clientes;
- **Update**: ainda não implementado;
- **Delete**: excluir cliente.

## 11. Exercícios para os alunos

1. Adicione um campo de endereço ao formulário e ao payload enviado.
2. Implemente a edição de um cliente usando `PUT` ou `PATCH`.
3. Crie uma busca por nome na lista.
4. Desabilite o botão de salvar enquanto a requisição estiver em andamento.
5. Mova os estilos inline para um arquivo usando `StyleSheet.create`.
6. Crie validações para formato de email e tamanho mínimo do telefone.
7. Mostre um indicador de carregamento durante a busca de clientes.
8. Separe a URL da API em uma variável de ambiente para não deixá-la fixa no código.

## 12. Problemas comuns

### A tela não abre ou fica com erro de módulo

Confira os nomes de arquivos e pastas. No macOS e no Linux, maiúsculas e minúsculas podem fazer diferença. Depois, limpe o cache:

```bash
npx expo start -c
```

### O login falha

Verifique a conexão com a internet e use as credenciais de teste indicadas neste README. A ReqRes é uma API externa e pode mudar suas regras.

### A lista ou o cadastro retornam 404

Confira a URL em `src/services/api.js`. O recurso usado atualmente é `dados`; se você criar outro recurso no MockAPI, precisa atualizar a URL base.

### A API responde, mas a mensagem de sucesso não aparece

Verifique se a requisição está sendo aguardada com `await` e se o código não está entrando no `catch`. No Expo Web, a aplicação também exibe mensagens diretamente na tela para não depender somente de alertas nativos.

### O aplicativo não atualiza depois de uma alteração

Pare e inicie o Expo novamente ou use:

```bash
npx expo start -c
```

## 13. Próximos passos

Depois de entender este projeto, o aluno pode:

- criar uma API própria;
- adicionar cadastro real de usuários;
- proteger rotas com autenticação no servidor;
- substituir o MockAPI por um backend com banco de dados;
- adicionar testes para componentes e serviços.

Este projeto é educacional e pode ser modificado livremente para atividades de aula.
