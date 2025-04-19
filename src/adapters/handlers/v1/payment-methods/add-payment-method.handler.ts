import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { paymentMethodsInsertSchema } from "../../../../drizzle/schema/payment_methods.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";

export async function addPaymentMethodHandler(c: Context, next: Next) {
    const { data: body, error: bodyError } =
        paymentMethodsInsertSchema.safeParse(await c.req.json());
    if (bodyError) throw new ApiError("Invalid body!", 400);

    const user = await getInjection("IGetUserByIdUseCase")(c.get("userId"));

    const isAllowed = await getInjection("ICheckAccessUseCase")({
        principal: {
            id: c.get("userId"),
            roles: user.publicMetadata["roles"] as string[],
        },
        resource: {
            kind: "payment_method",
            id: c.get("userId"),
        },
        action: "insert",
    });

    if (!isAllowed) throw new ApiError("Access denied!", 401);

    const method = await getInjection("IAddPaymentMethodUseCase")({
        type: body.type,
    });

    return successResponse(c, { data: method });
}
