import { authors, books } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class booksController {
	static listBooks = async (req, res, next) => {
		try {
			const findBooks = books.find();

			// Salva a query que pegaria todos os livros
			// Manda pro middleware de paginação
			req.result = findBooks;
			next();
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
				new NotFound("Id do livro não localizado.");
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
				new NotFound("Id do livro não localizado.");
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
				new NotFound("Id do livro não localizado.");
			}
		} catch (error) {
			next(error);
		}
	}

	static listBooksByFilter = async (req, res, next) => {
		try {
			const filter = await processQuery(req.query);
			const booksResult = books.find(filter).populate("author");

			req.result = booksResult;
			next();
		} catch (error) {
			next(error);
		}
	}
}

async function processQuery(params) {
	const { publisher, title, authorName, minPages, maxPages } = params;
	const filter = {}

	if(minPages || maxPages) { 
		filter.pagesNumber = {};

		minPages ? (filter.pagesNumber.$gte = parseInt(minPages)) : null;
		maxPages ? (filter.pagesNumber.$lte = parseInt(maxPages)) : null;
	}

	// Veio o nome do autor na requisição
	if(authorName) {
		const author = await authors.findOne({ name: authorName });
		
		// Verifica se esse autor existe
		if (author) {
			// Se existir coloca o id no filtro
			// A funcao populate se encarrega de colocar esses dados
			filter.author = author._id;
		} else {
			// Se não existir lança um NotFound dizendo q o nome do autor não foi encontrado
			throw new NotFound(`Autor "${authorName}" não foi encontrado no sistema.`);
		}
	}

	publisher ? ( filter.publisher = publisher ) : null;
	title ? (filter.title = { $regex: new RegExp(title, "i") }) : null;

	return filter;
}

export default booksController;