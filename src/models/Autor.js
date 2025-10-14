import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String, 
      // Essa mensagem é mostrada em caso de erro de não vir um campo obrigatorio.
      required: [true, "O nome do(a) autor(a) é obrigatorio."]
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
)

const autores = mongoose.model("autores", autorSchema)

export default autores;