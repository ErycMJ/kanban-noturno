# Kanban do Asa Noturna

# Tecnologias Utilizadas
## Backend
- NestJS
- TypeScript
- Banco em Memória
- UUID
- CORS

## Frontend
- React 18
- TypeScript
- Tailwind CSS v3.4.17
- Axios
- Lucide React
- Vite

## Utilitários
- Figma
- Copilot

## Logo Asa Noturna
- https://i.pinimg.com/1200x/a2/41/64/a24164012312a5316459dbc1b1e7abcd.jpg

## Funcionalidades
-  Cadastro de projetos (A fazer, Em progresso, Finalizado)
-  Listagem de tarefas
-  Edição e exclusão de projetos e tarefas
-  Layout estilo Kanban Notion
-  Paleta de cores baseadas no Asa Noturna

## Instalação e Execução
### Pré-requisitos
- Node.js
- npm

### Backend
cd server
npm install
npm run start

O servidor estará rodando em: http://localhost:3000

### Frontend
cd client
npm install
npm run dev

O frontend estará rodando em: http://localhost:5173

## Endpoints da API
Método, Endpoint, Descrição

GET, `/projects`, Lista todos os projetos

POST, `/projects`, Cria um novo projeto

PATCH, `/projects/:id`, Atualiza um projeto

## Amostra do funcionamento
https://www.loom.com/share/1bf9f426dcbc409e8478a5094d329c88?sid=3c139a22-e908-456e-b848-65bf51fc9b12

## Preview sem backend
https://kanban-noturno-git-main-emjs-projects-fd31054b.vercel.app/
