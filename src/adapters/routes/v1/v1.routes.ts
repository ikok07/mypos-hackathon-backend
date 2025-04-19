import { Hono } from "hono";
import webhookRoutes from "./webhooks/webhooks.routes.ts";
import profileRoutes from "./profiles/profile.routes.ts";
import paymentMethodsRoutes from "./payment-methods/payment-methods.routes.ts";

const v1Routes = new Hono();

v1Routes.route("/profiles", profileRoutes);
v1Routes.route("/payment-methods", paymentMethodsRoutes);
v1Routes.route("/webhooks", webhookRoutes);

export default v1Routes;
