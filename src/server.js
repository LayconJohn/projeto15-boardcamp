import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

import categoriesRouter from "./routers/categoriesRouters.js";
import gamesRouter from "./routers/gamesRouters.js";
import customersRouter from "./routers/customersRouters.js";
import rentalsRouter from "./routers/rentalsRouters.js";

const server = express();

server.use(cors());
server.use(express.json());

//categories
server.use(categoriesRouter);

//games
server.use(gamesRouter);

//Customers
server.use(customersRouter);

//Rentals
server.use(rentalsRouter);

server.listen(process.env.PORT, () => {
    console.log("==============================");
    console.log(chalk.green("Listenning on port " + process.env.PORT))
    console.log("==============================");
})