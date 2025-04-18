import { Context, Next } from "hono";
import { ApiError } from "../../entities/models/errors/ApiError.ts";
import { getInjection } from "../../di/container.ts";

export async function protect(c: Context, next: Next) {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) throw new ApiError("Missing authorization token!", 401);

  if (!user) throw new ApiError("Unauthorized!", 401);

  c.set("user", user);
  await next();
}
