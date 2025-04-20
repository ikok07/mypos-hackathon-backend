import { Hono } from "hono";
import webhookRoutes from "./webhooks/webhooks.routes.ts";
import profileRoutes from "./profiles/profile.routes.ts";
import paymentMethodsRoutes from "./payment-methods/payment-methods.routes.ts";
import loyaltyCardsRoutes from "./loyalty-cards/loyalty-cards.routes.ts";
import visitsRoutes from "./visits/visits.routes.ts";
import balancesRoutes from "./balances/balances.routes.ts";

const v1Routes = new Hono();

v1Routes.route("/profile", profileRoutes);
v1Routes.route("/loyalty-cards", loyaltyCardsRoutes);
v1Routes.route("/visits", visitsRoutes);
v1Routes.route("/payment-methods", paymentMethodsRoutes);
v1Routes.route("/balances", balancesRoutes);
v1Routes.route("/webhooks", webhookRoutes);

export default v1Routes;
