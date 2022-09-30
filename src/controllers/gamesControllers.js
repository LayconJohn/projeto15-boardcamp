import { connection } from "../db/database.js";


const getGames = async (req, res) => {
    const { name } = req.query;

    try {
        let games;
        if (name) {
            games = await connection.query(`SELECT * FROM games WHERE name LIKE "%${name}%";`);
            return res.status(200).send(games.rows)
        }
        games = await connection.query('SELECT * FROM games');

        res.status(200).send(games.rows)
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
};

const postGames = async (req,res) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        //Verificar se existe a categoria
        const categoria = (await connection.query('SELECT name FROM categories WHERE id = $1 ;', [categoryId])).rows[0];
        if (!categoria) {
            return res.sendStatus(400);
        }

        //Verificar se o nome já existe
        const game = (await connection.query('SELECT name FROM games WHERE name = $1;', [name])).rows[0];
        if (game) {
            return res.sendStatus(409);
        }

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay]);
        
        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }

};

export {getGames, postGames};