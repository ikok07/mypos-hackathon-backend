import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";

export async function getPaymentMethodsHandler(c: Context, next: Next) {
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
        action: "select",
    });

    if (!isAllowed) throw new ApiError("Access denied!", 401);

    const methods = await getInjection("IGetPaymentMethodsUseCase")();

    return successResponse(c, { data: methods });
}
