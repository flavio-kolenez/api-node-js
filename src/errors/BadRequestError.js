import BaseError from "./BaseErrors.js";

class BadRequest extends BaseError {
    constructor(message = "Um ou mais dados fornecidos estão incorretos.") {
        super(message, 400);
    }
}

export default BadRequest;