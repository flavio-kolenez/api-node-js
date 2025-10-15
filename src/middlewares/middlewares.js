import mongoose from "mongoose";
import BaseError from "../errors/BaseErrors.js";
import BadRequest from "../errors/BadRequestError.js";
import ValidationError from "../errors/validationError.js";

// MiddleWare de erro
function errorManipulator(erro, req, res, next) { 
    console.error(erro);

    if (erro instanceof mongoose.Error.CastError) {
        // Formatação de string errada
        return new BadRequest().sendResponse(res);
    } 
    
    else if (erro instanceof mongoose.Error.ValidationError) {
        // Retorna um array com os erros vindo de erro
        // E reescreve para a mensagem que esta dentro de erro
        return new ValidationError(erro).sendResponse(res);
    } 
    
    else if(erro instanceof BaseError) {
        return erro.sendResponse(res);
    } 
    
    else {
        // Deu algum outro B.O
        // Função que criamos para retornar um erro base
        return new BaseError().sendResponse(res);
    }
}

export default errorManipulator;