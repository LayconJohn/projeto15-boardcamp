import { Router } from "express";

import { postCustomer } from "../controllers/customersControllers.js";

const router = Router();

router.post("/customers", postCustomer);

export default router;