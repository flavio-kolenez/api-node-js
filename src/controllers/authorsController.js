import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";

class AuthorController {
	static listAuthors = async (req, res, next) => {
		try {
			const fetchedAuthors = await authors.find();
			res.status(200).json(fetchedAuthors);
		} catch (error) {
			next(error);
		}
	}

	static listAuthorById = async (req, res, next) => {
		try {
			const id = req.params.id;
			const authorResult = await authors.findById(id);

			if (authorResult !== null) {
				res.status(200).send(authorResult);
			} else {
				next(new NotFound("Id do Autor não localizado."));
			}
		} catch (error) {
			// Verifica se o erro é uma  instancia de erro do mongoose
			// isso vem de por exemplo uma formatacao de string errada do ID vindo como parametro
			// Encaminha para o middleware de erro do servidor
			next(error);
		}
	}

	static registerAuthor = async (req, res, next) => {
		try {
			let author = new authors(req.body);
			const authorResult = await author.save();
			res.status(201).send(authorResult.toJSON());
		} catch (error) {
			next(error);
		}
	}

	static updateAuthor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const fetchedAuthors = await authors.findByIdAndUpdate(id, { $set: req.body });
			
			if(fetchedAuthors !== null) {
				res.status(200).send({ message: "Autor atualizado com sucesso." });
			} else {
				new NotFound("Id do Autor não localizado.")
			}
		} catch (error) {
			next(error);
		}
	}

	static removeAuthor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const deletedAuthor = await authors.findByIdAndDelete(id);
			
			if (deletedAuthor !== null) {
				res.status(200).send({ message: "Autor removido com sucesso" });
			} else {
				new NotFound("Id do Autor não localizado.")
			}
		} catch (error) {
			next(error);
		}
	}
}

export default AuthorController;