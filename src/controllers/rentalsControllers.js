import { connection } from "../db/database.js";

import dayjs from "dayjs";
import moment from "moment";

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

const finishRental = async (req, res) => {
    const { id } = req.params;

    const returnDate = dayjs().format('YYYY-MM-DD');

   try {
    const rental = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);
    if (!rental.rows[0]) {
        return res.sendStatus(404);
    }

    if (rental.rows[0].returnDate !== null) {
        return res.sendStatus(400);
    }

    const game = await connection.query('SELECT * FROM games WHERE id = $1', [rental.rows[0].gameId])

    const date = dayjs(rental.rows[0].rentDate.toLocaleString().slice(0,10)).format('YYYY-MM-DD');
    const diff = moment(returnDate, "YYYY-MM-DD") - moment(date, "YYYY-MM-DD")
    const delayFee = (moment.duration(diff).asDays()) * game.rows[0].pricePerDay;
    
    
    await connection.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [returnDate, delayFee, id]);

    res.sendStatus(200);
   } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
   } 
};

const deleteRental = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(404);
    }

    try {
        const rental = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (!rental.rows[0]) {
            return res.sendStatus(404);
        }

        if (rental.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }
        await connection.query('DELETE FROM rentals WHERE id = $1', [id]);

        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
};

export {postRental, getRentals, finishRental, deleteRental};