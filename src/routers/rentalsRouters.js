import { Router } from "express";

import { postRental, getRentals } from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", postRental);

export default router;