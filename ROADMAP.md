# Roadmap - Grocery Helper

## ✅ Implementado (Sprint 1)

### Domain Layer

- ✅ Entidades: `Category`, `StockItem`, `ShoppingList`, `ShoppingListItem`
- ✅ Interfaces de repositório para todas as entidades
- ✅ Types: `ResourceType`, `PriorityLevel`

### Application Layer

- ✅ DTOs: Create, Update e Response para todas as entidades
- ✅ Services: `CategoryService`, `StockItemService`, `ShoppingListService`, `ShoppingListItemService`
  - CRUD completo
  - Métodos adicionais: `markAsPurchased`, `updateStockQuantity`

### Infrastructure Layer

- ✅ Configuração: Environment com dotenv
- ✅ Database: SQLite com auto-migrations
- ✅ Repositories: Implementações de repositório para todas as entidades

### Presentation Layer

- ✅ Express com Handlebars
- ✅ HTMX integrado
- ✅ Routes: `/categories`, `/stock-items`, `/shopping-lists`
- ✅ Controllers: `CategoryController`, `StockItemController`, `ShoppingListController`
- ✅ Templates:
  - Páginas principais: `categories.hbs`, `stock_items.hbs`, `shopping_lists.hbs`
  - Partials: formulários e itens de cada entidade
  - Helpers: `eq` para comparações
- ✅ Navegação entre módulos

---

## 📋 Próximos Passos (Sprint 2)

### 1. **Implementar Shopping List Items** 🔴 PRIORIDADE ALTA

#### 1.1 Templates

- [ ] `shopping_list_item.hbs` - Exibir item da lista
- [ ] `shopping_list_item_form.hbs` - Formulário para adicionar item à lista
- [ ] `shopping_list_item_edit_form.hbs` - Formulário para editar item
- [ ] `shopping_list_items.hbs` - Página completa de itens da lista com priorização

#### 1.2 Controller

- [ ] `ShoppingListItemController.ts`
  - `create` - Adicionar item à lista
  - `getById` - Obter item específico
  - `getByShoppingList` - Listar todos os itens de uma lista
  - `update` - Editar item (quantidade, prioridade, status)
  - `markAsPurchased` - Marcar como comprado
  - `delete` - Remover item

#### 1.3 Routes

- [ ] `shopping_list_items.ts`
  - `GET /shopping-lists/:listId/items` - Listar itens de uma lista
  - `POST /shopping-lists/:listId/items` - Adicionar item
  - `GET /shopping-list-items/:id` - Obter item
  - `GET /shopping-list-items/:id/edit` - Formulário de edição
  - `PUT /shopping-list-items/:id` - Editar item
  - `POST /shopping-list-items/:id/purchased` - Marcar como comprado
  - `DELETE /shopping-list-items/:id` - Remover item

### 2. **Melhorias na Visualização** 🟡 PRIORIDADE MÉDIA

- [ ] Exibir informações de categoria junto com itens do estoque
- [ ] Filtros por categoria em `/stock-items`
- [ ] Busca/search em listas
- [ ] Indicadores visuais de status (comprado, pendente)
- [ ] Dashboard home com resumo de:
  - Total de itens no estoque
  - Listas de compras ativas
  - Itens pendentes de compra

### 3. **Funcionalidades Avançadas** 🟡 PRIORIDADE MÉDIA

#### 3.1 Priorização Inteligente

- [ ] Exibir sugestão de prioridade ao adicionar item à lista
- [ ] Ordenação por:
  - Prioridade (high → medium → low)
  - Data de recurso disponível
  - Quantidade faltante no estoque

#### 3.2 Integração Estoque ↔ Lista de Compras

- [ ] Ao criar item de lista, validar se existe no estoque
- [ ] Mostrar quantidade atual no estoque
- [ ] Sugerir quantidade a comprar baseado em:
  - Estoque atual
  - Consumo estimado
  - Tipo de recurso disponível

#### 3.3 Histórico e Relatórios

- [ ] Histórico de compras (itens já marcados como comprados)
- [ ] Relatório de consumo por categoria
- [ ] Previsão de próximas compras

### 4. **Testes** 🔵 PRIORIDADE BAIXA

- [ ] Testes unitários para Services
- [ ] Testes de integração para Repositories
- [ ] Testes E2E para fluxos principais

### 5. **UX/UI** 🔵 PRIORIDADE BAIXA

- [ ] Animações HTMX para transições
- [ ] Toast/notificações para ações (sucesso/erro)
- [ ] Validação de formulários no frontend
- [ ] Melhorias de responsividade mobile
- [ ] Dark mode (opcional)

### 6. **Deploy e Produção** 🔵 PRIORIDADE BAIXA

- [ ] Script de build para produção
- [ ] Arquivo `.env` para produção
- [ ] Documentação de deployment
- [ ] Docker/containerização (opcional)

---

## 🐛 Bugs/Issues Conhecidos

- [ ] Helper `eq` do Handlebars foi adicionado manualmente (considerar usar uma biblioteca melhor no futuro)

---

## 📚 Notas Técnicas

### Estrutura de Arquivos

```
src/
├── domain/              # Lógica de negócio pura
├── application/         # Casos de uso
├── infrastructure/      # Detalhes técnicos
└── presentation/        # Interface com usuário
    ├── controllers/
    ├── routes/
    ├── views/          # Handlebars templates
    └── public/         # CSS, JS estático
```

### Padrões Utilizados

- **Arquitetura Onion**: Camadas bem definidas
- **Repository Pattern**: Abstração do acesso a dados
- **DTO Pattern**: Transferência entre camadas
- **Service Layer**: Lógica de negócio isolada

### Tecnologias

- **Runtime**: Node.js + TypeScript
- **Framework Web**: Express.js
- **Template Engine**: Handlebars (hbs)
- **Frontend Interativo**: HTMX
- **Styling**: Tailwind CSS
- **Database**: SQLite
- **Dev Tools**: tsx (TypeScript executor)

---

## 🎯 Visão do Projeto

O **Grocery Helper** é uma aplicação web para gerenciar mantimentos domésticos com:

1. Cadastro e organização de itens em estoque
2. Criação de listas de compras inteligentes
3. Priorização baseada em disponibilidade de recursos
4. Interface responsiva e intuitiva com HTMX

O projeto serve como demonstração de uma arquitetura em camadas bem estruturada, separação de responsabilidades e boas práticas de desenvolvimento.
