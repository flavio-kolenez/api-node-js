import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {
      type: String, 
      // Essa mensagem é mostrada em caso de erro de não vir um campo obrigatorio.
      required: [true, "O nome do(a) autor(a) é obrigatorio."]
    },
    nationality: {type: String}
  },
  {
    versionKey: false
  }
)

const authors = mongoose.model("autores", authorSchema)

export default authors;