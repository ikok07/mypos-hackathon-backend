import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { getCurrentProfileByIdHandler } from "../../../../handlers/v1/profiles/current/get-current-profile-by-id.handler.ts";
import { getCurrentLoyaltyCardHandler } from "../../../../handlers/v1/profiles/current/get-current-loyalty-card.handler.ts";
import { getCurrentPaymentMethodsHandler } from "../../../../handlers/v1/profiles/current/get-current-payment-methods.handler.ts";
import { getCurrentVisitsHandler } from "../../../../handlers/v1/profiles/current/get-current-visits.handler.ts";

const currentProfileRoutes = new Hono();

currentProfileRoutes.get("/", catchErrorsHandler(getCurrentProfileByIdHandler));
currentProfileRoutes.get(
    "/loyalty-card",
    catchErrorsHandler(getCurrentLoyaltyCardHandler)
);
currentProfileRoutes.get(
    "/visits",
    catchErrorsHandler(getCurrentVisitsHandler)
);
currentProfileRoutes.get(
    "/payment-methods",
    catchErrorsHandler(getCurrentPaymentMethodsHandler)
);

export default currentProfileRoutes;
