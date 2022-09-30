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
        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES (${name}, ${image}, ${Number(stockTotal)}, ${Number(categoryId)}, ${Number(pricePerDay)});`);

        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }

};

export {getGames, postGames};