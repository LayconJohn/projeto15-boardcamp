import { connection } from "../db/database.js";

import { nameGameSchema } from "../schemas/gamesSchema.js";

const getGames = async (req, res) => {
    const name = (req.query.name).trim();

    try {
        let games;
        if (!name) {
            games = await connection.query('SELECT * FROM games WHERE name LIKE "%$1%";', [name]);
            return res.status(200).send(games.rows)
        }
        games = await connection.query('SELECT * FROM games');

        res.status(200).send(games.rows)
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
};

export {getGames};