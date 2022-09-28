import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

import categoriesRouter from "./routers/categoriesRouters.js";

const server = express();

server.use(cors());
server.use(express.json());

//categories
server.use(categoriesRouter);

server.listen(process.env.PORT, () => {
    console.log("==============================");
    console.log(chalk.green("Listenning on port " + process.env.PORT))
    console.log("==============================");
})