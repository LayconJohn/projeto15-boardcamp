import { nameGameSchema } from "../schemas/gamesSchema.js";

const validateGamesSchema = (req, res, next) => {
    const {name} = req.query;
    if (name) {
        const validation = nameGameSchema.validate({name}, {abortEarly: false});

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(400).send(errors);
        }
    }
    next();
};


export {validateGamesSchema};