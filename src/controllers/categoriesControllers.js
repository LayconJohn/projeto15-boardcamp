import { connection } from "../db/database.js";

const getCategories = async (req, res) => {

    const categories = await connection.query("SELECT * FROM categories;");

    res.status(200).send(categories.rows);
};

const postCategories = async (req, res) => {
    const { name } = req.body;

    const categorie = await connection.query(`SELECT name FROM categories WHERE name = '${name}'`);
    
    if (categorie) {
        return res.sendStatus(409);
    }

    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);

    res.sendStatus(201);
};

export {getCategories, postCategories}