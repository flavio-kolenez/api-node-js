# 🗺️ Diagrama dos Middlewares - API Node.js

```mermaid
graph TD
    A[📨 REQUEST] --> B[🔧 express.json]
    B --> C[🛣️ routes/index.js]
    
    C --> D{🔍 Route Match?}
    
    D -->|✅ /books| E[📚 Books Routes]
    D -->|✅ /authors| F[👤 Authors Routes]
    D -->|❌ No Match| G[🚫 manipulator404.js]
    
    E --> H{📖 Books Endpoint?}
    F --> I{👨‍💼 Authors Endpoint?}
    
    H -->|GET /books| J[📄 listBooks Controller]
    H -->|GET /books/filter| K[🔍 listBooksByFilter]
    H -->|Other CRUD| L[📖 Other Books Controllers]
    
    I -->|GET /authors| M[📄 listAuthors Controller]
    I -->|Other CRUD| N[👨‍💼 Other Authors Controllers]
    
    J --> O[📋 Pagination Middleware]
    M --> O
    
    K --> P{🎯 Success?}
    L --> P
    N --> P
    O --> P
    
    G --> Q[🔄 errorManipulator]
    
    P -->|✅ Success| R[📤 RESPONSE]
    P -->|❌ Error| Q
    
    Q --> S{🔍 Error Type?}
    
    S -->|CastError| T[🚫 BadRequest - 400]
    S -->|ValidationError| U[⚠️ ValidationError - 400]
    S -->|BaseError| V[🎯 Custom Error]
    S -->|Other| W[💥 BaseError - 500]
    
    T --> R
    U --> R
    V --> R
    W --> R
    
    style A fill:#e1f5fe
    style R fill:#e8f5e8
    style Q fill:#fff3e0
    style G fill:#ffebee
    style O fill:#f3e5f5
```

## 📋 Fluxo dos Middlewares

### 1. **Middlewares Globais (app.js)**
```javascript
app.use(express.json());        // Parse JSON do body
routes(app);                    // Aplica todas as rotas
app.use(manipulator404);        // Captura rotas inexistentes
app.use(errorManipulator);      // Trata todos os erros
```

### 2. **Route Middlewares**
- `books`: `/books`, `/books/:id`, `/books/filter`
- `authors`: `/authors`, `/authors/:id`

### 3. **NEW! Pagination Middleware (page.js)**
- Aplicado em: `GET /books` e `GET /authors`
- Funcionalidades:
  - **Paginação:** `?limit=5&pages=2`
  - **Ordenação:** `?sortBy=title:1` ou `?sortBy=pagesNumber:-1`
  - **Populate:** Carrega dados do autor automaticamente

### 4. **Controller Layer**
- `booksController`: CRUD + filtros avançados + paginação
- `authorsController`: CRUD básico + paginação
- **Filtros avançados:** publisher, title, authorName, minPages, maxPages

### 5. **Error Handling Chain**
```
manipulator404 → errorManipulator → Response
```
- **CastError:** ObjectId inválido → 400
- **ValidationError:** Dados inválidos → 400
- **BaseError:** Erros customizados → 404, etc
- **Other:** Erro genérico → 500

### 6. **Response Types**
- **200** - Success (GET com resultados)
- **201** - Created (POST successful)
- **400** - Bad Request/Validation
- **404** - Not Found
- **500** - Internal Error

## 🔥 Características

- ✅ **Centralizado** - Um middleware para todos os erros
- ✅ **Tipado** - Diferentes tipos de erro  
- ✅ **Fallback** - 404 para rotas inexistentes
- ✅ **Consistente** - Mesmo formato de resposta
- 🆕 **Paginação** - Middleware reutilizável para listagens
- 🆕 **Ordenação** - Sort dinâmico por qualquer campo
- 🆕 **Filtros Avançados** - Busca por múltiplos critérios
- 🆕 **Populate Automático** - Carrega relacionamentos automaticamente

## 🚀 Como usar o GitHub para mostrar o diagrama:

### **Opção 1 - GitHub nativo (RECOMENDADO):**
- GitHub já renderiza Mermaid automaticamente!
- Só commitar este arquivo `.md` e o diagrama aparece bonitinho

### **Opção 2 - Mermaid Live + Badge:**
```markdown
[![Middleware Diagram](https://img.shields.io/badge/View-Middleware_Diagram-blue)](https://mermaid.live/)
```

### **Opção 3 - GitHub Pages:**
- Ativar GitHub Pages no repositório
- O markdown renderiza com o diagrama