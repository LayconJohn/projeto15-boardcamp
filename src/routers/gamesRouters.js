import { Router } from "express";

import { getGames } from "../controllers/gamesControllers.js";

import { validateGamesSchema } from "../middlewares/validationGamesSchema.js";

const router = Router();

router.get("/games", validateGamesSchema ,getGames);

export default router;