import { Router } from "express";

import { postCustomer, getCustomers, getCustomersById, updateCustomer } from "../controllers/customersControllers.js";
import { validateCustomerSchema, validateCustomerCPF } from "../middlewares/validationCustomer.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", validateCustomerSchema, validateCustomerCPF ,postCustomer);
router.put("/customers/:id", validateCustomerSchema, updateCustomer);

export default router;