import { Hono } from "hono";
import webhookRoutes from "./webhooks/webhooks.routes.ts";

const v1Routes = new Hono();

v1Routes.route("/webhooks", webhookRoutes);

export default v1Routes;
