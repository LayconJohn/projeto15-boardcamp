import joi from "joi";

const nameGameSchema = joi.object({
    name: joi.string().min(1)
})

export {nameGameSchema};