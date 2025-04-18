import { Context, Next } from "hono";
import { protectWebhook } from "../../../../middlewares/protect-webhook.ts";
import { getInjection } from "../../../../../di/container.ts";
import { z } from "zod";
import { ApiError } from "../../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../../entities/utils/handlers/successResponse.ts";

const requestBodySchema = z.object({
  type: z.literal("user.deleted"),
  data: z.object({
    id: z.string(),
  }),
});

export async function userDeletedWebhookHandler(c: Context, next: Next) {
  const payload = await c.req.text();
  const result = protectWebhook(
    c,
    Deno.env.get("USER_DELETED_WEBHOOK_SECRET")!,
    payload
  );
  if (!result) throw new ApiError("Unauthorized", 401);

  const { data: body, error: bodyError } = requestBodySchema.safeParse(
    JSON.parse(payload)
  );
  if (bodyError) throw new ApiError("Invalid body", 400);

  const deleteProfileUseCase = getInjection("IDeleteProfileUseCase");
  await deleteProfileUseCase(body.data.id);

  return successResponse(c);
}
