import { Hono } from "hono";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import { getLoyaltyCardByCardIdHandler } from "../../../handlers/v1/loyalty-cards/get-loyalty-card-by-card-id.handler.ts";
import { createLoyaltyCardHandler } from "../../../handlers/v1/loyalty-cards/create-loyalty-card.handler.ts";
import { getLoyaltyCardByUserIdHandler } from "../../../handlers/v1/loyalty-cards/get-loyalty-card-by-user-id.handler.ts";
import { protect } from "../../../middlewares/protect.ts";

const loyaltyCardsRoutes = new Hono();

loyaltyCardsRoutes.use(catchErrorsHandler(protect));

loyaltyCardsRoutes.get(
    "/:cardId",
    catchErrorsHandler(getLoyaltyCardByCardIdHandler)
);
loyaltyCardsRoutes.get(
    "/profile/:userId",
    catchErrorsHandler(getLoyaltyCardByUserIdHandler)
);

loyaltyCardsRoutes.post("/", catchErrorsHandler(createLoyaltyCardHandler));

export default loyaltyCardsRoutes;
