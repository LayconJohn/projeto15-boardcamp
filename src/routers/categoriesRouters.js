import { Router } from "express";

import { getCategories, postCategories } from "../controllers/categoriesControllers.js";

import { validateCategorieSchema } from "../middlewares/validationCategoriesSchema.js";

const router = Router();

router.get("/categories", getCategories);

router.post("/categories", validateCategorieSchema, postCategories);

export default router;
