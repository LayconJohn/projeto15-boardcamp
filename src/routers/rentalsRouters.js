import { Router } from "express";

import { postRental, getRentals, finishRental } from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", postRental);
router.post("/rentals/:id/return", finishRental);

export default router;