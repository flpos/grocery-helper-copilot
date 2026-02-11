# Grocery Helper 🛒

Uma aplicação web para gerenciar mantimentos domésticos, com controle de estoque e criação de listas de compras inteligentes.

## 📋 Sobre o Projeto

Grocery Helper é uma solução pessoal para organizar e acompanhar o estoque de alimentos em casa, facilitando a criação de listas de compras com priorização baseada em disponibilidade de recursos (salário, vale alimentação, etc).

**Status**: Projeto pessoal em desenvolvimento

## ✨ Funcionalidades Principais

- ✅ **Gerenciar Estoque**: Adicionar e remover quantidades de itens do estoque doméstico
- ✅ **Categorização**: Organizar itens por categorias (alimentos, bebidas, higiene, etc)
- ✅ **Lista de Compras**: Criar e gerenciar listas de compras dinâmicas
- ✅ **Priorização Inteligente**: Priorizar itens de compra baseado em:
  - Disponibilidade de recursos (salário, vale alimentação)
  - Necessidade e urgência

## 🏗️ Arquitetura

O projeto segue a **Arquitetura Onion** para manter separação de responsabilidades e facilitar testes e manutenção:

```
src/
├── domain/                 # Entidades do negócio
│   ├── entities/          # Modelos de domínio
│   └── interfaces/        # Contratos (repositories, services)
├── application/           # Lógica de aplicação
│   ├── services/          # Casos de uso da aplicação
│   └── dtos/              # Data Transfer Objects
├── infrastructure/        # Implementações técnicas
│   ├── database/          # SQLite, migrations, seeds
│   ├── repositories/      # Implementações de repositórios
│   └── config/            # Configurações
└── presentation/          # Camada de apresentação
    ├── routes/            # Definição de rotas Express
    ├── controllers/       # Controladores
    ├── views/             # Templates Handlebars
    ├── public/            # Arquivos estáticos (Tailwind CSS)
    └── middleware/        # Middlewares Express
```

### Camadas

- **Domain**: Core de negócio, independente de frameworks
- **Application**: Orquestração de casos de uso, sem dependências de infraestrutura
- **Infrastructure**: Detalhes técnicos (banco de dados, APIs externas)
- **Presentation**: Interface com usuário (HTTP, templates, static files)

## 🛠️ Tecnologias

| Camada | Tecnologia | Uso |
|--------|-----------|-----|
| Backend | **Express.js** | Framework web leve e flexível |
| Frontend | **HTMX** | Interações dinâmicas sem JavaScript volumoso |
| Templates | **Handlebars** | Renderização de HTML no servidor |
| Estilo | **Tailwind CSS** | Framework CSS utility-first |
| Banco de Dados | **SQLite** | Banco de dados leve e portável |
| Runtime | **Node.js** | Ambiente JavaScript |

## 📦 Requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn**

## 🚀 Como Iniciar

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd grocery-helper-cop
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Banco de Dados

```bash
npm run db:migrate
npm run db:seed  # (opcional) Popular com dados de exemplo
```

### 4. Iniciar a Aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Estrutura de Desenvolvimento

```bash
# Executar em modo desenvolvimento (com auto-reload)
npm run dev

# Executar testes
npm test

# Lint do código
npm run lint

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 📂 Estrutura de Diretórios

```
grocery-helper-cop/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   └── interfaces/
│   ├── application/
│   │   ├── services/
│   │   └── dtos/
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── repositories/
│   │   └── config/
│   └── presentation/
│       ├── routes/
│       ├── controllers/
│       ├── views/
│       ├── public/
│       └── middleware/
├── tests/
├── .env.example
├── package.json
└── README.md
```

## 🔧 Configuração

Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário:

```bash
cp .env.example .env
```

**Variáveis principais:**
- `NODE_ENV`: Ambiente (development, production)
- `PORT`: Porta da aplicação (padrão: 3000)
- `DATABASE_PATH`: Caminho do arquivo SQLite

## 💡 Padrões de Design

- **Repository Pattern**: Abstração do acesso a dados
- **Service Layer**: Lógica de negócio isolada
- **DTOs**: Transferência de dados entre camadas
- **Dependency Injection**: Desacoplamento de dependências

## 🧪 Testes

O projeto utiliza testes para garantir qualidade:

```bash
# Rodar todos os testes
npm test

# Rodar com cobertura
npm run test:coverage
```

## 🤝 Contribuindo

Este é um projeto pessoal de estudos. Melhorias e sugestões são bem-vindas!

## 📝 Licença

Projeto pessoal - sem licença específica.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através do repositório.

---

**Última atualização**: Fevereiro, 2026
