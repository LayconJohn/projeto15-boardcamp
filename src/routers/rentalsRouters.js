import { Router } from "express";

import { postRental } from "../controllers/rentalsControllers.js";

const router = Router();

router.post("/rentals", postRental);

export default router;