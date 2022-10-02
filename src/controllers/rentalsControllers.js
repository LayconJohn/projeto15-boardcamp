import { connection } from "../db/database.js";

import dayjs from "dayjs";

const getRentals = async (req, res) => {
    const { customerId, gameId } = req.query;

    try {
        let rentals;
        if (customerId) {
            rentals = await connection.query(`
        SELECT 
            rentals.*,
            customers.id AS "idCustomer",
            customers.name AS "nameCustomer",
            games.id AS "idGame",
            games.name AS "nameGame",
            games."categoryId",
            categories.name AS "categoryName"
        FROM customers
            JOIN rentals ON customers.id = rentals."customerId" 
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
        WHERE rentals."customerId" = $1
        ;`, [customerId]);
        } else if (gameId) {
            rentals = await connection.query(`
        SELECT 
            rentals.*,
            customers.id AS "idCustomer",
            customers.name AS "nameCustomer",
            games.id AS "idGame",
            games.name AS "nameGame",
            games."categoryId",
            categories.name AS "categoryName"
        FROM customers
            JOIN rentals ON customers.id = rentals."customerId" 
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
        WHERE rentals."gameId" = $1
        ;`, [gameId]);
        } else {
            rentals = await connection.query(`
            SELECT 
                rentals.*,
                customers.id AS "idCustomer",
                customers.name AS "nameCustomer",
                games.id AS "idGame",
                games.name AS "nameGame",
                games."categoryId",
                categories.name AS "categoryName"
            FROM customers
                JOIN rentals ON customers.id = rentals."customerId" 
                JOIN games ON games.id = rentals."gameId"
                JOIN categories ON categories.id = games."categoryId"
            ;`);
        }
        

        const result = rentals.rows.map((rental => {
            return {
                id: rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: rental.rentDate,
                daysRented: rental.daysRented,
                returnDate: rental.returnDate,
                originalPrice: rental.originalPrice,
                delayFee: rental.delayFee,
                customer: {
                    id: rental.idCustomer,
                    name: rental.nameCustomer
                },
                game: {
                    id: rental.idGame,
                    name: rental.nameGame,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName
                }
            }
        }))

        res.status(200).send(result)
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
};

const postRental = async (req, res) => {
    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs().format('YYYY-MM-DD');

    try {
        //Verificar se o customer é existente
        const customer = await connection.query('SELECT * from customers WHERE id = $1;', [customerId]);

        //Pegar Preço por dia em games
        const game = await connection.query('SELECT * FROM games WHERE id = $1;', [gameId]);
        if (!customer.rows[0] || !game.rows[0] || daysRented > 0) {
            return res.sendStatus(400);
        }

        const rentals = await connection.query('SELECT * FROM rentals WHERE "gameId" = $1;', [game.rows[0].id])
        if (rentals.rows.length > game.rows[0].stockTotal) {
            return res.sendStatus(400);
        }

        const originalPrice = daysRented * game.rows[0].pricePerDay;

        await connection.query('INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, daysRented, rentDate, null, originalPrice, null]);

        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
};

export {postRental, getRentals};