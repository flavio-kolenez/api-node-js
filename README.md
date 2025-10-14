# 📚 Books & Authors API

Uma API RESTful moderna para gerenciamento de uma livraria fictica, construída com Node.js, Express e MongoDB.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript.
- **Express** - Framework web.
- **MongoDB** - Banco de dados NoSQL.
- **Mongoose** - ODM para MongoDB.

## 📋 Funcionalidades

-  **CRUD completo** para autores e livros.
-  **Relacionamento** entre livros e autores (populate).
-  **Validações customizadas** com mensagens em português.
-  **Tratamento de erros** com classes especializadas.
-  **Middleware de erro** centralizado.
-  **Busca por editora** com query parameters.
-  **Códigos HTTP apropriados** (200, 201, 400, 404, 500).

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/flavio-kolenez/api-node-js.git
cd api-node-js
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o MongoDB:**
   - Certifique-se de ter o MongoDB rodando localmente
   - Ou configure uma string de conexão no arquivo `src/config/dbConnect.js`

4. **Execute o projeto:**
```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

## 📖 Documentação da API

### **Endpoints para autores**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/authors` | Lista todos os autores |
| GET | `/authors/:id` | Busca autor por ID |
| POST | `/authors` | Cria novo autor |
| PUT | `/authors/:id` | Atualiza autor |
| DELETE | `/authors/:id` | Remove autor |

### **Endpoints para livros**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/books` | Lista todos os livros |
| GET | `/books/:id` | Busca livro por ID |
| GET | `/books/find?publisher=nome` | Busca livros por editora |
| POST | `/books` | Cria novo livro |
| PUT | `/books/:id` | Atualiza livro |
| DELETE | `/books/:id` | Remove livro |

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── dbConnect.js          # Configuração do MongoDB
├── controllers/
│   ├── authorsController.js  # Lógica dos autores
│   └── booksController.js    # Lógica dos livros
├── errors/
│   ├── BaseErrors.js         # Classe base de erros
│   ├── BadRequestError.js    # Erro 400
│   ├── NotFound.js           # Erro 404
│   └── validationError.js    # Erros de validação
├── middlewares/
│   ├── middlewares.js        # Middleware de tratamento de erros
│   └── manipulator404.js     # Middleware para rotas não encontradas
├── models/
│   ├── Author.js             # Schema do autor
│   └── Book.js               # Schema do livro
├── routes/
│   ├── authorRoutes.js       # Rotas dos autores
│   ├── booksRoutes.js        # Rotas dos livros
│   └── index.js              # Agregador de rotas
└── app.js                    # Configuração do Express
```

## ⚠️ Tratamento de Erros

A API retorna erros padronizados:

- **400** - Dados inválidos ou ID malformado
- **404** - Recurso não encontrado
- **500** - Erro interno do servidor

Exemplo de resposta de erro:
```json
{
  "message": "Os seguintes erros foram encontrados: O nome do autor é obrigatório.",
  "status": 400
}
```

## 👨‍💻 Autor

**Flavio Kolenez**
- GitHub: [@flavio-kolenez](https://github.com/flavio-kolenez)


---

⭐ **Se este projeto foi útil para você, deixe uma estrela!**