import { Webhook } from "svix";
import { Context } from "hono";

export function protectWebhook(
  c: Context,
  webhookSecret: string,
  payload: string
) {
  const fn = (c: Context) => {
    try {
      const wh = new Webhook(webhookSecret);

      wh.verify(payload, {
        "svix-id": c.req.header("svix-id") ?? "",
        "svix-timestamp": c.req.header("svix-timestamp") ?? "",
        "svix-signature": c.req.header("svix-signature") ?? "",
      });
      return true;
    } catch {
      return false;
    }
  };
  return fn(c);
}
