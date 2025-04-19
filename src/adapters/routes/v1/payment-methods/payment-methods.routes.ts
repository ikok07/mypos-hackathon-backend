import { Hono } from "hono";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import { getPaymentMethodsHandler } from "../../../handlers/v1/payment-methods/get-payment-methods.handler.ts";
import { protect } from "../../../middlewares/protect.ts";
import { addPaymentMethodHandler } from "../../../handlers/v1/payment-methods/add-payment-method.handler.ts";
import { removePaymentMethodHandler } from "../../../handlers/v1/payment-methods/remove-payment-method.handler.ts";

const paymentMethodsRoutes = new Hono();

paymentMethodsRoutes.use(catchErrorsHandler(protect));

paymentMethodsRoutes.get("/", catchErrorsHandler(getPaymentMethodsHandler));
paymentMethodsRoutes.post("/", catchErrorsHandler(addPaymentMethodHandler));
paymentMethodsRoutes.delete(
    "/:methodId",
    catchErrorsHandler(removePaymentMethodHandler)
);

export default paymentMethodsRoutes;
