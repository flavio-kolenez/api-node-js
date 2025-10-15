import express from "express";
import BooksController from "../controllers/booksController.js";
import paginate from "../middlewares/page.js";

const router = express.Router();

router
  .get("/books", BooksController.listBooks, paginate)
  .get("/books/find", BooksController.listBooksByFilter, paginate)
  .get("/books/:id", BooksController.listBookById)
  .post("/books", BooksController.registerBook)
  .put("/books/:id", BooksController.updateBook)
  .delete("/books/:id", BooksController.removeBook)

export default router; 