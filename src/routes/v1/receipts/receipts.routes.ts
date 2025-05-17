import { Router } from "express";
import { catchErrors } from "../../../utils/catch-errors";
import { getCustomerReceiptsByOrderIdHandler } from "../../../handlers/receipts/get-customer-receipts-by-order-id.handler";

const receiptsRoutes = Router();

receiptsRoutes.get("/:orderId", catchErrors(getCustomerReceiptsByOrderIdHandler));

export default receiptsRoutes;