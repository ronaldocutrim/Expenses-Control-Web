# Expense Control App - Frontend

Um aplicativo moderno para controle de gastos pessoais, construído com React, TypeScript e Tailwind CSS.

## 🚀 Características

- **Gerenciamento de Categorias**: Crie, edite e exclua categorias de gastos com cores personalizadas
- **Controle de Transações**: Adicione, edite e remova transações organizadas por categoria
- **Interface Responsiva**: Design moderno e responsivo usando Tailwind CSS
- **Validação de Formulários**: Validação robusta com Zod e React Hook Form
- **Estado Global**: Gerenciamento eficiente de estado com TanStack Query

## 🛠️ Tecnologias

- **Framework**: React 19.1.1
- **Linguagem**: TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS 4.1.13
- **Componentes UI**: Radix UI
- **Gerenciamento de Estado**: TanStack React Query
- **Validação**: Zod + React Hook Form
- **Ícones**: Lucide React
- **Gráficos**: Recharts

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## ⚡ Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd Expense-Control-App/frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure a API**

   Certifique-se de que a API backend esteja rodando em `http://localhost:8080/api`

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

   O aplicativo estará disponível em `http://localhost:5173`

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
npm run lint:fix

# Formatação de código
npm run format
npm run format:check
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de interface reutilizáveis
│   ├── AddCategoryModal.tsx
│   ├── CategoryManager.tsx
│   ├── ExpensesByCategory.tsx
│   └── ...
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e validações
├── services/           # Serviços de API
├── types/              # Definições de tipos TypeScript
└── App.tsx             # Componente principal
```

## 🔧 Funcionalidades

### Categorias
- Criar novas categorias com nome e cor
- Editar categorias existentes
- Excluir categorias (com confirmação)
- Visualizar total de gastos por categoria

### Transações
- Adicionar transações com descrição, valor e categoria
- Editar transações existentes
- Excluir transações
- Visualizar transações organizadas por categoria

### Interface
- **Aba Expenses**: Gerenciamento de transações por categoria
- **Aba Categories**: Gerenciamento de categorias
- **Aba Statistics**: Visualização de dados com gráficos interativos

### Gráficos e Estatísticas
- **Cards de Resumo**: Total de gastos, transações, média por transação e número de categorias
- **Gráfico de Pizza**: Distribuição percentual de gastos por categoria
- **Gráfico de Barras**: Comparação visual de gastos entre categorias
- **Gráfico de Linha**: Tendência mensal de gastos (simulado)
- **Tabela Detalhada**: Lista completa com percentuais e valores por categoria

## 🎨 Design System

O projeto utiliza um design system baseado em:
- **Radix UI**: Componentes acessíveis e sem estilo
- **Tailwind CSS**: Estilização utilitária
- **CVA (Class Variance Authority)**: Variantes de componentes
- **Lucide React**: Ícones consistentes

## 🔌 API Integration

O frontend consome uma API REST com os seguintes endpoints:

### Categorias
- `GET /api/categories` - Listar todas as categorias
- `GET /api/categories/:id` - Buscar categoria por ID
- `POST /api/categories` - Criar nova categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Excluir categoria

### Transações
- `POST /api/transactions` - Criar nova transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Excluir transação

## 🧪 Qualidade de Código

O projeto utiliza:
- **ESLint**: Linting de código
- **Prettier**: Formatação automática
- **TypeScript**: Tipagem estática
- **Zod**: Validação de esquemas

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.
