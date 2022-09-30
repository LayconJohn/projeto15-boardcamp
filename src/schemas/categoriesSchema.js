import joi from "joi";

const categorieSchema = joi.object({
    name: joi.string().min(1).required()
})

export {categorieSchema}