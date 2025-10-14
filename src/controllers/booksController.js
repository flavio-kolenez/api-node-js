import { books } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class booksController {
	static listBooks = async (req, res, next) => {
		try {
			const fecthedBooks = await books.find()
				.populate("author")
				.exec();

			res.status(200).json(fecthedBooks);
		} catch (error) {
			next(error);
		}
	}

	static listBookById = async (req, res, next) => {
		try {
			const id = req.params.id;
			const bookResult = await books.findById(id).populate("author", "name").exec();
			
			if (bookResult !== null) {
				res.status(200).send(bookResult);
			} else {	
				new NotFound("Id do livro não localizado.")
			}
		} catch (error) {
			next(error);
		}
	}

	static registerBook = async (req, res, next) => {
		try {
			let book = new books(req.body);
			const bookResult = await book.save();
			res.status(201).send(bookResult.toJSON());
		} catch (error) {
			next(error);
		}
	}

	static updateBook = async (req, res, next) => {
		try {
			const id = req.params.id;
			const updatedBook = await books.findByIdAndUpdate(id, { $set: req.body });
			
			if (updatedBook !== null) {
				res.status(200).send({ message: "Livro atualizado com sucesso" });
			} else {
				new NotFound("Id do livro não localizado.")
			}
		} catch (error) {
			next(error);
		}
	}

	static removeBook = async (req, res, next) => {
		try {
			const id = req.params.id;
			const deletedBook = await books.findByIdAndDelete(id);
			
			if (deletedBook !== null) {
				res.status(200).send({ message: "Livro removido com sucesso" });
			} else {
				new NotFound("Id do livro não localizado.")
			}
		} catch (error) {
			next(error);
		}
	}

	// Precisa testar isso no postman
	static listBooksByFilter = async (req, res, next) => {
		try {
			const { publisher, title } = req.query;
			const filter = {}

			publisher ? (filter.publisher = publisher) : null;
			title ? (filter.title = { 
						$regex: title,
						$options: "i" 
					}) 
			: null;

			const booksResult = await books.find(filter);
			res.status(200).send(booksResult);
		} catch (error) {
			next(error);
		}
	}
}

export default booksController;