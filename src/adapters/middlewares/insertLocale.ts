import { Context, Next } from "hono";
import { SUPPORTED_LANGUAGES } from "../config/config.ts";

export async function insertLocale(c: Context, next: Next) {
  let locale = c.req.header("Accept-Language");
  if (!locale || SUPPORTED_LANGUAGES.includes(locale)) locale = "en";

  c.set("locale", locale);
  await next();
}
