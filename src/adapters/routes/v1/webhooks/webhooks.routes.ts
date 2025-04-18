import { Hono } from "hono";
import webhookAuthRoutes from "./auth/auth.routes.ts";

const webhookRoutes = new Hono();

webhookRoutes.route("/auth", webhookAuthRoutes);

export default webhookRoutes;
