import { Hono } from "hono";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import { protect } from "../../../middlewares/protect.ts";
import { getCurrentProfileByIdHandler } from "../../../handlers/v1/profiles/get-current-profile-by-id.handler.ts";
import { getCurrentLoyaltyCardHandler } from "../../../handlers/v1/profiles/loyalty-cards/get-current-loyalty-card.handler.ts";

const profilesRoutes = new Hono();

profilesRoutes.use(catchErrorsHandler(protect));

profilesRoutes.get(
    "/current",
    catchErrorsHandler(getCurrentProfileByIdHandler)
);
profilesRoutes.get(
    "/current/loyalty-card",
    catchErrorsHandler(getCurrentLoyaltyCardHandler)
);

export default profilesRoutes;
