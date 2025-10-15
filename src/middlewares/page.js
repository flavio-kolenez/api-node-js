import BadRequest from "../errors/BadRequestError.js";

async function paginate(req, res, next) {
    try {
        let { limit = 5, pages = 1, sortBy = "_id:-1" } = req.query;

        limit = parseInt(limit);
        pages = parseInt(pages);

        // Processa o sortBy
        let [sortField, orderBy] = sortBy.split(":");
        orderBy = orderBy === "-1" ? -1 : 1;

        // Vem da requisição feita no proprio controller
        // Fica salvo nesse objeto req
        const result = req.result;

        if (limit > 0 && pages > 0) {
            const paginatedResult = await result
                .sort({ [sortField]: orderBy })
                .skip((pages - 1) * limit)
                .limit(limit)
                .exec();

            res.status(200).json(paginatedResult);
        } else {
            next(new BadRequest("Foram fornecidos valores negativos na consulta!"));
        }
    } catch (erro) {
        next(erro);
    }
}

export default paginate;