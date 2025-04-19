import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { getLoyaltyCardByCardIdHandler } from "../../../../handlers/v1/profiles/loyalty-cards/get-loyalty-card-by-card-id.handler.ts";

const loyaltyCardsRoutes = new Hono();

loyaltyCardsRoutes.get(
    "/:cardId",
    catchErrorsHandler(getLoyaltyCardByCardIdHandler)
);

export default loyaltyCardsRoutes;
