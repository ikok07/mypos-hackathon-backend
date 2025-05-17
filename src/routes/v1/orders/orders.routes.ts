import { Router } from "express";
import { getCustomerOrdersHandler } from "../../../handlers/orders/get-customer-orders.handler";
import { catchErrors } from "../../../utils/catch-errors";

const ordersRoutes = Router();

ordersRoutes.get("/:userId", catchErrors(getCustomerOrdersHandler));

export default ordersRoutes;