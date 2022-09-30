import joi from "joi";

const nameGameSchema = joi.object({
    name: joi.string().min(1)
})

const gamesBodySchema = joi.object({
    name: joi.string().min(1).required(),
    image: joi.link().required(),
    stockTotal: joi.number().integer().min(1).required(),
    categoryId: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().integer().min(1).required()
})

export {nameGameSchema, gamesBodySchema};