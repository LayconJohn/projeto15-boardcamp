import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().min(1).required(),
    phone: joi.string().pattern(new RegExp('(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)')).required(),
    cpf: joi.string().pattern(new RegExp('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}')).required(),
    birthday: joi.date().required(),
})///^\d{4}-\d{1,2}-\d{1,2}$/

export {customerSchema};