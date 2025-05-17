import { Router } from "express";
import { catchErrors } from "../../../utils/catch-errors";
import { paymentSuccessPospointsHandler } from "../../../handlers/mypos/payment-success-pospoints.handler";
import { paymentFailedPospointsHandler } from "../../../handlers/mypos/payment-failed-pospoints.handler";

const myposRoutes = Router();

myposRoutes.post("/payment/success/pospoints", catchErrors(paymentSuccessPospointsHandler));
myposRoutes.post("/payment/fail/pospoints", catchErrors(paymentFailedPospointsHandler));

export default myposRoutes;