import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		id: { type: String },
		title: {
			type: String,
			required: [true, "O título do livro é obrigatório."]
		},
		
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'autores',
			required: [true, "O nome do autor é obrigatório"]
		},

		publisher: {
			type: String,
			required: [true, "O nome da editora é obrigatório."]
		},
		pagesNumber: {
			type: Number,
			min: 10,
			max: 5000,
		}
	},
	{
		versionKey: false
	}
);

const books = mongoose.model('livros', bookSchema);

export default books;