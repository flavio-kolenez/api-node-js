import BaseError from "./BaseErrors.js"

class NotFound extends BaseError {
    constructor(message = "Página não encontrada") {
        super(message, 404);
    }
}

export default NotFound;