import { Router } from "express";

import { getCategories } from "../controllers/categoriesControllers.js";

const router = Router();

router.get("/categories", getCategories);

export default router;
