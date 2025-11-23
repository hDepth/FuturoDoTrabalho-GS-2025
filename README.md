# 📘 CP2APPAI — Gamificação para Produtividade

Bem-vindo ao repositório oficial do **CP2APPAI**, um aplicativo desenvolvido para a Global Solution 2025 da FIAP, utilizando **React Native com Expo**, integrado a um backend Node.js/Express conectado ao banco **Oracle Cloud (FIAP)**.

Este README foi criado para ser **completo, profissional e pronto para entrega**, explicando:

* O **desafio da GS**
* O **funcionamento do app**
* A **API + backend hospedado no Render**
* O fluxo de autenticação
* O sistema de gamificação (XP, recompensas, loja)
* A publicação no **Firebase App Distribution**
* Passos para rodar o projeto
* Estrutura, tecnologias e arquitetura

---

# 🎯 1. O DESAFIO DA GLOBAL SOLUTION 2025 (FIAP)

A proposta da GS foi desenvolver uma solução digital voltada ao futuro do trabalho, incluindo recursos de engajamento e produtividade. Nosso grupo decidiu criar um **sistema de gamificação** no qual usuários acumulam pontos realizando atividades e podem trocá-los por recompensas.

O aplicativo possui **duas áreas**:

* **Fluxo do usuário comum** → Acompanhamento de XP, metas, conquistas, loja.
* **Fluxo administrativo (Admin)** → Gerenciamento de usuários, submissões, loja e recompensas.

A solução é composta por:
✔ App mobile (React Native + Expo)
✔ Backend (Node.js + Express)
✔ Banco Oracle (oracledb)
✔ Autenticação JWT
✔ Upload de imagens
✔ Publicação via Firebase App Distribution
✔ Backend hospedado no Render

---

# 📱 2. SOBRE O APP (FUNCIONALIDADES)

O **CP2APPAI** é um aplicativo moderno de gamificação com foco em produtividade. Ele permite que usuários:

### 👤 Fluxo do Usuário

* Criem e gerenciem sua conta
* Visualizem seu progresso (XP, nível e metas)
* Realizem submissões de atividades
* Comprem itens com pontos acumulados
* Consultem detalhes dos itens e recompensas
* Acessem a página "Sobre o App" com hash do commit da versão publicada

### 🔐 Fluxo do Administrador

Admins podem:

* Aprovar/reprovar submissões
* Acompanhar detalhes dos envios
* Criar, editar e excluir itens da loja
* Fazer upload de imagens de produtos
* Visualizar usuários e estatísticas

---

# 🛠️ 3. TECNOLOGIAS UTILIZADAS

### 📌 Frontend (App)

* React Native (Expo)
* React Navigation
* Axios
* AsyncStorage
* Lottie Animations
* Componentização moderna e design responsivo

### 📌 Backend (API)

* Node.js + Express
* JWT para autenticação
* OracleDB (FIAP)
* Multer para upload de imagens
* Dotenv
* Render para deploy

---

# 🌐 4. API / BACKEND (DEPLOY NO RENDER)

O backend foi publicado no Render, disponível em:

➡ **[https://futurodotrabalho-gs-2025-backend.onrender.com](https://futurodotrabalho-gs-2025-backend.onrender.com)**

### 📌 Rotas principais

```
GET /api/auth/me
POST /api/auth/login
POST /api/admin/store/items       (admin)
GET /api/admin/store/items        (admin)
PUT /api/admin/store/items/:id    (admin)
DELETE /api/admin/store/items/:id (admin)
POST /api/submissions
GET /api/submissions
```

### 📌 Variáveis de ambiente no Render

```
DB_USER=
DB_PASSWORD=
DB_CONNECT_STRING=
PORT=4000
JWT_SECRET=
```

---

# 🔑 5. AUTENTICAÇÃO

O app usa **JWT + Axios interceptor**.
O token é salvo no AsyncStorage:

```js
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

Toda área administrativa exige:

```js
req.user.role === "admin"
```

---

# 🧩 6. ARQUITETURA DO APP

```
📁 src/
 ├── api/api.js
 ├── navigation/
 │    ├── AdminStack.js
 │    ├── AppTabsAdmin.js
 │    └── UserStack.js
 ├── screens/
 │    ├── user/
 │    ├── admin/
 │    └── auth/
 ├── components/
 ├── styles/
 └── utils/
```

---

# 🏪 7. SISTEMA DE LOJA (GAMIFICAÇÃO)

* Itens cadastrados no painel Admin
* Itens possuem nome, descrição, custo e imagem
* Usuário pode tocar nos cards para ver detalhes
* Imagens externas carregam via URL
* Itens sem imagem recebem ícone padrão

---

# 📤 8. PUBLICAÇÃO NO FIREBASE APP DISTRIBUTION

A versão final do aplicativo foi publicada no Firebase App Distribution.

### 📌 Requisitos cumpridos:

✔ Projeto gerado em **.apk** + **.aab**
✔ Publicado no App Distribution
✔ Professor adicionado como tester
✔ Commit hash exibido na tela “Sobre o App”

---

# 🧪 9. COMO RODAR O APP LOCALMENTE

### 🔧 Instalar dependências

```
npm install
```

### ▶ Rodar app

```
npx expo start
```

---

# 💾 10. COMO RODAR O BACKEND LOCALMENTE

```
npm install
npm run dev
```

Requer **Oracle Instant Client** instalado.

---

# 📡 11. COMO ALTERAR A BASE URL DO FRONTEND

Arquivo: `/src/api/api.js`

### 🔥 Em produção:

```js
baseURL: "https://futurodotrabalho-gs-2025-backend.onrender.com/api"
```

### 🧪 Em desenvolvimento (Android Emulator):

```js
baseURL: "http://10.0.2.2:4000/api"
```

---

# 🏁 12. CONCLUSÃO

O **CP2APPAI** é uma solução completa para gamificação de produtividade, com backend robusto, app moderno e integração com serviços reais como OracleDB, Render e Firebase.

O projeto cumpre todos os requisitos da Global Solution e apresenta uma arquitetura sólida e escalável.

---

# 👥 Integrantes do Grupo

* Nome 1
* Nome 2
* Nome 3

(Preencher com os nomes reais)

---

# 📌 Commit Referência da Versão Publicada

```
30ced303aed17dc7f486c8e6a07f0fb1612440bf
```
