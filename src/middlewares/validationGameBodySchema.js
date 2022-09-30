import {gamesBodySchema} from "../schemas/gamesSchema.js";

const validateGameBodySchema = (req, res, next) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const validation = gamesBodySchema.validate({ name, image, stockTotal, categoryId, pricePerDay }, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    next();
};

export {validateGameBodySchema};