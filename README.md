# 📘 Sistema de Cadastro de Alunos

## 🎯 Objetivo

Aplicação desenvolvida para gerenciamento de alunos, permitindo cadastro, listagem e consumo de API externa, com foco em organização de estado e interface responsiva.

---

## 🛠 Tecnologias utilizadas

- React
- React Router DOM
- Context API
- Fetch API
- CSS
- Docker
- Git
- GitHub

---

## ⚙️ Funcionalidades

- Navegação entre páginas
- Cadastro de alunos
- Validação de formulário
- Estado global com Context API
- Listagem dinâmica de alunos
- Consumo de API REST externa
- Interface responsiva

---

## 📁 Estrutura do projeto

```txt
src
├── components
├── context
├── pages
├── services
├── styles
├── App.jsx
└── main.jsx
```

---

## 🐳 Como executar com Docker

### 🔨 Build da aplicação

```bash
docker compose up -d --build
```

---

### 📊 Visualizar logs

```bash
docker compose logs -f
```

---

### 🌐 Acessar aplicação

```txt
http://localhost:5173
```

---

### 🛑 Parar aplicação

```bash
docker compose down
```

---

## 🚀 Como executar localmente (sem Docker)

```bash
npm install
npm run dev
```

---

## 👥 Integrantes

- João Emanuel Pinheiro Leite
- Gabriel Santana Oliveira Silva
- Iago de Oliveira Rodrigues

---

## 📌 Observações

- O projeto utiliza Context API para gerenciamento de estado global  
- O consumo de API externa é feito via Fetch API  
- O layout foi construído com foco em responsividade (mobile, tablet e desktop)  
- Estilização centralizada em CSS global  

---

## ✅ Status do projeto

- ✔ Funcional  
- ✔ Responsivo  
- ✔ Estruturado  
- ✔ Pronto para entrega  
```