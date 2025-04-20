import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { getCurrentLoyaltyCardHandler } from "../../../../handlers/v1/profile/get-current-loyalty-card.handler.ts";
import { createCurrentLoyaltyCardHandler } from "../../../../handlers/v1/profile/create-current-loyalty-card.handler.ts";

const currentProfileLoyaltyCardsRoutes = new Hono();

currentProfileLoyaltyCardsRoutes.get(
    "/",
    catchErrorsHandler(getCurrentLoyaltyCardHandler)
);
currentProfileLoyaltyCardsRoutes.post(
    "/",
    catchErrorsHandler(createCurrentLoyaltyCardHandler)
);

export default currentProfileLoyaltyCardsRoutes;
