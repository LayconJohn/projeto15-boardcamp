import { Router } from "express";

import { postCustomer, getCustomers, getCustomersById } from "../controllers/customersControllers.js";
import { validateCustomerSchema, validateCustomerCPF } from "../middlewares/validationCustomer.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", validateCustomerSchema, validateCustomerCPF ,postCustomer);

export default router;