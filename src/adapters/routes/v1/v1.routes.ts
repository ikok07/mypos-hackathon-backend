import { Hono } from "hono";
import webhookRoutes from "./webhooks/webhooks.routes.ts";
import profilesRoutes from "./profiles/profiles.routes.ts";

const v1Routes = new Hono();

v1Routes.route("/profiles", profilesRoutes);
v1Routes.route("/webhooks", webhookRoutes);

export default v1Routes;
