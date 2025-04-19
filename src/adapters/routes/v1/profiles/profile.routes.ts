import { Hono } from "hono";
import currentProfileRoutes from "./current/current-profile.routes.ts";
import { protect } from "../../../middlewares/protect.ts";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import loyaltyCardsRoutes from "./loyalty-cards/loyalty-cards.routes.ts";

const profileRoutes = new Hono();

profileRoutes.use(catchErrorsHandler(protect));

profileRoutes.route("/current", currentProfileRoutes);
profileRoutes.route("/loyalty-cards", loyaltyCardsRoutes);

export default profileRoutes;
