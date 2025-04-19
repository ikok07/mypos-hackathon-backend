import { Hono } from "hono";
import webhookRoutes from "./webhooks/webhooks.routes.ts";
import currentProfileRoutes from "./profiles/current/current-profile.routes.ts";
import profileRoutes from "./profiles/profile.routes.ts";

const v1Routes = new Hono();

v1Routes.route("/profiles", profileRoutes);
v1Routes.route("/webhooks", webhookRoutes);

export default v1Routes;
