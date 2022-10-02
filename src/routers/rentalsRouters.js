import { Router } from "express";

import { postRental, getRentals, finishRental, deleteRental } from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", postRental);
router.post("/rentals/:id/return", finishRental);
router.delete("/rentals/:id", deleteRental);

export default router;