import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { userCreatedWebhookHandler } from "../../../../handlers/v1/webhooks/auth/user-created.handler.ts";
import { userDeletedWebhookHandler } from "../../../../handlers/v1/webhooks/auth/user-deleted.handler.ts";

const webhookAuthRoutes = new Hono();

webhookAuthRoutes.post(
  "/user/created",
  catchErrorsHandler(userCreatedWebhookHandler)
);

webhookAuthRoutes.post(
  "/user/deleted",
  catchErrorsHandler(userDeletedWebhookHandler)
);

export default webhookAuthRoutes;
