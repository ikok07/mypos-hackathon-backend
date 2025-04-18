import { Context } from "hono";

export function successResponse(c: Context, data?: object) {
  return c.json({
    status: "success",
    ...data,
  });
}
