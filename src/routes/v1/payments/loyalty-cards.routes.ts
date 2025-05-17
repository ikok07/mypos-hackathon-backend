import { Router } from "express";
import { catchErrors } from "../../../utils/catch-errors";
import { getLoyaltyCardHandler } from "../../../handlers/loyalty-cards/get-loyalty-card.handler";

const loyaltyCardsRoutes = Router();

loyaltyCardsRoutes.get("/:userId", catchErrors(getLoyaltyCardHandler));

export default loyaltyCardsRoutes;