import { connection } from "../db/database.js";

import { customerSchema } from "../schemas/customersSchema.js";

const getCustomers = async (req, res) => {
    const cpf = req.query.cpf;

    try {
        let customers; 
        if (cpf) {
            customers = await connection.query('SELECT * FROM customers WHERE cpf LIKE \'%$1%\';', [cpf]);
        }
        customers = await connection.query('SELECT * FROM customers;')

        res.status(200).send(customers.rows);
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const getCustomersById = async (req, res) => {
    const {id} = req.params;

    try {
        const customer = await connection.query('SELECT * FROM customers WHERE id = $1', [id]);
        if (customer.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(customer.rows[0]);
    } catch (error) {
        console.erroe(error);
        res.sendStatus(500);
    }
};


const postCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;

    //Verificar Schema
    const validation = customerSchema.validate({name, phone, cpf, birthday}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    try {

        //validar se cliente existe por cpf
        const user = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        console.log(user);
        if (user.rows.length > 0) {
            return res.sendStatus(409);
        }
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }

};

export {postCustomer, getCustomers, getCustomersById};