import { connection } from "../db/database.js";

import { customerSchema } from "../schemas/customersSchema.js";

const postCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;

    //Verificar Schema
    const validation = customerSchema.validate({name, phone, cpf, birthday}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    try {
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }

};

export {postCustomer};