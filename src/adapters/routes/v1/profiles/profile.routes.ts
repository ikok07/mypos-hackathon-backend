import { Hono } from "hono";
import currentProfileRoutes from "./current/current-profile.routes.ts";
import { protect } from "../../../middlewares/protect.ts";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import loyaltyCardsRoutes from "./loyalty-cards/loyalty-cards.routes.ts";
import visitsRoutes from "./visits/visits.routes.ts";
import paymentMethodsRoutes from "../payment-methods/payment-methods.routes.ts";

const profileRoutes = new Hono();

profileRoutes.use(catchErrorsHandler(protect));

profileRoutes.route("/current", currentProfileRoutes);
profileRoutes.route("/loyalty-cards", loyaltyCardsRoutes);
profileRoutes.route("/:userId/visits", visitsRoutes);
profileRoutes.route("/:userId/payment-methods", paymentMethodsRoutes);

export default profileRoutes;
