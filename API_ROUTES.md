# 📚 API Routes - Node.js Book Management

Base URL: `http://localhost:3000`

## 🏠 **Root Route**

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/` | API Info | `{"titulo": "Curso de node"}` |

---

## 👥 **Authors Routes** (`/authors`)

### **List all authors**
```http
GET /authors
```
**Response:** `200 OK`
```json
[
  {
    "_id": "ObjectId",
    "name": "Nome do Autor",
    "nationality": "Nacionalidade"
  }
]
```

### **Get author by ID**
```http
GET /authors/{id}
```
**Parameters:**
- `id` (string) - Author ObjectId

**Response:** `200 OK`
```json
{
  "_id": "ObjectId",
  "name": "Nome do Autor", 
  "nationality": "Nacionalidade"
}
```

**Error Responses:**
- `400` - Invalid ID format
- `404` - Author not found

### **Create new author**
```http
POST /authors
Content-Type: application/json
```
**Body:**
```json
{
  "name": "Nome do Autor",
  "nationality": "Nacionalidade"
}
```

**Response:** `201 Created`
```json
{
  "_id": "ObjectId",
  "name": "Nome do Autor",
  "nationality": "Nacionalidade"
}
```

**Error Response:** `400` - Validation error
```json
{
  "message": "Os seguintes erros foram encontrados: O nome do(a) autor(a) é obrigatorio.",
  "status": 400
}
```

### **Update author**
```http
PUT /authors/{id}
Content-Type: application/json
```
**Parameters:**
- `id` (string) - Author ObjectId

**Body:**
```json
{
  "name": "Novo Nome",
  "nationality": "Nova Nacionalidade"
}
```

**Response:** `200 OK`
```json
{
  "message": "Autor atualizado com sucesso."
}
```

### **Delete author**
```http
DELETE /authors/{id}
```
**Parameters:**
- `id` (string) - Author ObjectId

**Response:** `200 OK`
```json
{
  "message": "Autor removido com sucesso"
}
```

---

## 📖 **Books Routes** (`/books`)

### **List all books**
```http
GET /books
```
**Response:** `200 OK`
```json
[
  {
    "_id": "ObjectId",
    "title": "Título do Livro",
    "author": {
      "_id": "ObjectId",
      "name": "Nome do Autor",
      "nationality": "Nacionalidade"
    },
    "publisher": "Nome da Editora",
    "pagesNumber": 250
  }
]
```

### **Get book by ID**
```http
GET /books/{id}
```
**Parameters:**
- `id` (string) - Book ObjectId

**Response:** `200 OK`
```json
{
  "_id": "ObjectId",
  "title": "Título do Livro",
  "author": {
    "_id": "ObjectId", 
    "name": "Nome do Autor"
  },
  "publisher": "Nome da Editora",
  "pagesNumber": 250
}
```

### **Find books by publisher**
```http
GET /books/find?publisher={publisherName}
```
**Query Parameters:**
- `publisher` (string) - Publisher name

**Example:**
```http
GET /books/find?publisher=Penguin
```

**Response:** `200 OK`
```json
[
  {
    "_id": "ObjectId",
    "title": "Livro 1",
    "author": "ObjectId",
    "publisher": "Penguin",
    "pagesNumber": 300
  }
]
```

### **Create new book**
```http
POST /books
Content-Type: application/json
```
**Body:**
```json
{
  "title": "Título do Livro",
  "author": "ObjectId_do_Autor",
  "publisher": "Nome da Editora",
  "pagesNumber": 250
}
```

**Response:** `201 Created`
```json
{
  "_id": "ObjectId",
  "title": "Título do Livro",
  "author": "ObjectId_do_Autor",
  "publisher": "Nome da Editora", 
  "pagesNumber": 250
}
```

**Error Response:** `400` - Validation error
```json
{
  "message": "Os seguintes erros foram encontrados: O título do livro é obrigatório.; O nome do autor é obrigatório; O nome da editora é obrigatório.",
  "status": 400
}
```

### **Update book**
```http
PUT /books/{id}
Content-Type: application/json
```
**Parameters:**
- `id` (string) - Book ObjectId

**Body:**
```json
{
  "title": "Novo Título",
  "publisher": "Nova Editora",
  "pagesNumber": 300
}
```

**Response:** `200 OK`
```json
{
  "message": "Livro atualizado com sucesso"
}
```

### **Delete book**
```http
DELETE /books/{id}
```
**Parameters:**
- `id` (string) - Book ObjectId

**Response:** `200 OK`
```json
{
  "message": "Livro removido com sucesso"
}
```

---

## 🚨 **Error Responses**

### **400 - Bad Request**
```json
{
  "message": "Um ou mais dados fornecidos estão incorretos.",
  "status": 400
}
```

### **404 - Not Found**
```json
{
  "message": "Página não encontrada",
  "status": 404
}
```

### **500 - Internal Server Error**
```json
{
  "message": "Erro interno do servidor",
  "status": 500
}
```

---

## 🧪 **Test Examples**

### **Quick Test Sequence:**

1. **Create an author:**
```bash
POST /authors
{
  "name": "J.K. Rowling",
  "nationality": "British"
}
```

2. **Create a book:** (use the author ID from step 1)
```bash
POST /books
{
  "title": "Harry Potter",
  "author": "AUTHOR_ID_HERE",
  "publisher": "Bloomsbury",
  "pagesNumber": 400
}
```

3. **Test the endpoints:**
- `GET /authors` - List all authors
- `GET /books` - List all books (with populated author data)
- `GET /books/find?publisher=Bloomsbury` - Find books by publisher

---

## 📝 **Notes**

- All ObjectIds must be valid MongoDB ObjectIds (24 hex characters)
- Author references in books are automatically populated with author data
- Validation errors return detailed messages in Portuguese
- Use `Content-Type: application/json` for POST/PUT requests
- Both authors and books routes use English endpoints (`/authors`, `/books`)