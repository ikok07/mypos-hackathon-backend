import { Context, Next } from "hono";
import { ApiError } from "../../entities/models/errors/ApiError.ts";

export function catchErrorsHandler(
  handler: (c: Context, next: Next) => Promise<Response | void>
) {
  return async (c: Context, next: Next): Promise<Response | void> => {
    try {
      return await handler(c, next);
    } catch (err) {
      if (err instanceof ApiError) {
        return c.json(
          {
            status: "fail",
            error: err.message,
          },
          err.statusCode
        );
      }

      console.error(err);
      return c.json(
        {
          status: "fail",
          error: "Unknown error occurred!",
        },
        500
      );
    }
  };
}
