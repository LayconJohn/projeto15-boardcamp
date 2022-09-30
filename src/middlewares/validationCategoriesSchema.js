import { categorieSchema } from "../schemas/categoriesSchema.js";

const validateCategorieSchema = (req, res, next) => {
    const {name} = req.body;

    const validation = categorieSchema.validate({name}, {abortEarly: false})

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(400).send(errors);
    }

    next();
};

export {validateCategorieSchema};