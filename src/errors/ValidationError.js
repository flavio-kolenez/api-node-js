import BadRequest from "./BadRequestError.js";

class ValidationError extends BadRequest {
    constructor(erro) {
        const errorMessages = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ");

        super(`Os seguintes erros foram encontrados: ${errorMessages}`);
    }
}

export default ValidationError;