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
			required: [true, "O nome da editora é obrigatório."],
			// Valor padrão são os values, qualquer coisa que seja divergente disso
			// Cai no message, que mostra o valor que chegou por padrão
			// enum: {
			// 	values: ["Casa do codigo", "Alura"],
			// 	message: "A editora {VALUES} não é um valor permitido"
			// }
		},

		pagesNumber: {
			type: Number,
			min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
			max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],

			// Para validações mais customizadas da pra usar esse validate
			// O value  dentro de validator é o valor que veio da Req
			// Doc:
			// https://mongoosejs.com/docs/validation.html
			validate: {
				validator: (value) => {
					return value >= 0 && value <= 5000;
				},

				message:  "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
			}	
		}
	},
	{
		versionKey: false
	}
);

const books = mongoose.model('livros', bookSchema);

export default books;