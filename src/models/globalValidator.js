import mongoose from "mongoose";

// Aplicando o metodo set para todos os campos do tipo string dos modelos
// Esse metodo recebe o nome da propriedade que queremos receber
// Que no caso é aquele validete, igual ao do Books.js
mongoose.Schema.Types.String.set("validate", {
    validator: (value) => value.trim() !== "", 
    message: ({ path }) => `O campo ${path} foi fornecido em branco.`
    // Path é o campo que esta sendo validado
});