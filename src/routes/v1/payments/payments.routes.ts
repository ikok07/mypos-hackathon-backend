import { Router } from "express";
import { catchErrors } from "../../../utils/catch-errors";
import { createPaymentHandler } from "../../../handlers/payments/create-payment.handler";
import { getPaymentStatusHandler } from "../../../handlers/payments/get-payment-status.handler";

const paymentsRoutes = Router();

paymentsRoutes.get("/create", catchErrors(createPaymentHandler));
paymentsRoutes.get("/:paymentOrderId", catchErrors(getPaymentStatusHandler));

export default paymentsRoutes;