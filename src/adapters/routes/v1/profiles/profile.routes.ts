import { Hono } from "hono";
import { protect } from "../../../middlewares/protect.ts";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import currentProfileLoyaltyCardsRoutes from "./loyalty-cards/loyalty-cards.routes.ts";
import { getCurrentProfileByIdHandler } from "../../../handlers/v1/profile/get-current-profile-by-id.handler.ts";
import currentProfileVisitsRoutes from "./visits/visits.routes.ts";
import currentProfileBalanceRoutes from "./balance/balance.routes.ts";

const profileRoutes = new Hono();

profileRoutes.use(catchErrorsHandler(protect));

profileRoutes.get("/", catchErrorsHandler(getCurrentProfileByIdHandler));
profileRoutes.route("/loyalty-card", currentProfileLoyaltyCardsRoutes);
profileRoutes.route("/visits", currentProfileVisitsRoutes);
profileRoutes.route("/balance", currentProfileBalanceRoutes);

export default profileRoutes;
