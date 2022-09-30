import { Router } from "express";

import { getGames, postGames } from "../controllers/gamesControllers.js";

import { validateGamesSchema } from "../middlewares/validationGamesSchema.js";
import { validateGameBodySchema } from "../middlewares/validationGameBodySchema.js";

const router = Router();

router.get("/games", validateGamesSchema ,getGames);
router.post("/games", validateGameBodySchema ,postGames);

export default router;