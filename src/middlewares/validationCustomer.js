import { connection } from "../db/database.js";

import { customerSchema } from "../schemas/customersSchema.js";

const validateCustomerSchema = (req, res, next) => {
    const { name, phone, cpf, birthday } = req.body;

    const validation = customerSchema.validate({name, phone, cpf, birthday}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }
    next();
};

const validateCustomerCPF = async (req, res, next) => {
    const { cpf } = req.body;
    try {
        //validar se cliente existe por cpf
        const user = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        if (user.rows.length > 0) {
            return res.sendStatus(409);
        }
        next();
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }

};


export { validateCustomerSchema, validateCustomerCPF }