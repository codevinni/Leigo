# Leigo.AI ⚖️
<p align="center">
<img src="frontend/public/leigo.png" alt="Descrição da Imagem" width="300"/>
</p>

[![Live Preview](https://img.shields.io/badge/Live-Preview-brightgreen?style=for-the-badge&logo=vercel)](https://leigo-ai.vercel.app)
[![Frontend](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Backend](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)


## 📋 Sobre o Projeto

Leigo.AI é uma aplicação web que utiliza inteligência artificial para analisar projetos de lei da Câmara dos Deputados brasileira e explicar seu impacto de forma personalizada, considerando a profissão do usuário.

### 🔥 Funcionalidades

- 📜 **Feed de Proposições**: Visualização das proposições legislativas mais recentes
- 🤖 **Análise por IA**: Análise automatizada usando Google Gemini
- 👤 **Personalização**: Impacto específico para sua profissão
- 📰 **Contexto de Notícias**: Busca automática de notícias relacionadas
- 🎨 **Interface Moderna**: Design responsivo e intuitivo (Mobile First)
- 🎯 **Análise Didática**: Explicações simples com analogias do dia a dia

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web Python moderno e rápido
- **Google Generative AI** - Gemini para análises inteligentes
- **HTTPX** - Cliente HTTP assíncrono
- **Python Dotenv** - Gerenciamento de variáveis de ambiente
- **NewsAPI** - Busca de notícias relacionadas

### Frontend
- **React 19** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **React Router** - Navegação entre páginas

---

## 📁 Estrutura do Projeto

```
Leigo/
├── backend/               # API FastAPI
│   ├── main.py            # Aplicação principal
│   ├── requirements.txt   # Dependências Python
│   ├── .env               # Variáveis de ambiente (não commitado)
│   └── .env.example       # Template de variáveis
│
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── services/     # Serviços de API
│   │   └── assets/       # Recursos estáticos
│   ├── public/           # Arquivos públicos
│   └── package.json      # Dependências Node
│
└── README.md            
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Python 3.8+** instalado
- **Node.js 16+** e **npm** instalados
- Chave de API do **Google Gemini**
- Chave de API do **NewsAPI**

### 1️⃣ Configurar o Backend

#### Passo 1: Navegue até a pasta do backend
```bash
cd backend
```

#### Passo 2: Crie um ambiente virtual (recomendado)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

#### Passo 3: Instale as dependências
```bash
pip install -r requirements.txt
```

#### Passo 4: Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `backend/` baseado no `.env.example`:

```env
# API Keys
GEMINI_API_KEY=sua_chave_gemini_aqui
NEWS_API_KEY=sua_chave_newsapi_aqui
```

**Como obter as chaves:**
- **Gemini API**: https://makersuite.google.com/app/apikey
- **NewsAPI**: https://newsapi.org/register

#### Passo 5: Execute o servidor
```bash
uvicorn main:app --reload
```

O backend estará rodando em: **http://127.0.0.1:8000**

📚 Documentação da API: **http://127.0.0.1:8000/docs**

---

### 2️⃣ Configurar o Frontend

#### Passo 1: Abra um novo terminal e navegue até a pasta frontend
```bash
cd frontend
```

#### Passo 2: Instale as dependências
```bash
npm install
```

#### Passo 3: Execute o servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará rodando em: **http://localhost:5173** (ou outra porta indicada)

---

## 🎯 Como Usar

1. **Acesse a aplicação** no navegador
2. **Defina sua profissão** no primeiro acesso
3. **Navegue pelo feed** de proposições legislativas
4. **Clique em "Analisar"** para ver o impacto personalizado
5. **Leia a análise** com:
   - Resumo geral para brasileiros
   - Impacto na sua área profissional
   - Explicação detalhada
   - Analogia didática

---

## 📡 Endpoints da API

### POST `/analyze`

Analisa uma proposição legislativa para uma profissão específica.

**Body:**
```json
{
  "proposal_id": 2318285,
  "job": "Desenvolvedor de Software"
}
```

**Response:**
```json
{
  "analisis": {
    "title": "Título da análise",
    "summary": "Resumo geral do impacto",
    "impact": "POSITIVO | NEGATIVO | NEUTRO",
    "explain": "Explicação específica para a profissão",
    "analogy": "Analogia didática"
  },
  "prompts": {
    "audio": "Prompt para geração de áudio",
    "image": "Prompt para geração de imagem"
  }
}
```


---

## 🔧 Scripts Disponíveis

### Backend
```bash
# Executar servidor de desenvolvimento
uvicorn main:app --reload

# Executar em produção
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

```

---

