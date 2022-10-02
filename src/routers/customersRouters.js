import { Router } from "express";

import { postCustomer, getCustomers, getCustomersById } from "../controllers/customersControllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", postCustomer);

export default router;