import joi from "joi";

const nameGameSchema = joi.object({
    name: joi.string().min(1)
})

const gamesBodySchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required()
})

export {nameGameSchema, gamesBodySchema};