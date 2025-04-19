import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";
import { NotFoundError } from "../../../../entities/models/errors/NotFoundError.ts";

export async function removePaymentMethodHandler(c: Context, next: Next) {
    try {
        const methodId = c.req.param("methodId");
        const user = await getInjection("IGetUserByIdUseCase")(c.get("userId"));

        const isAllowed = getInjection("ICheckAccessUseCase")({
            principal: {
                id: c.get("userId"),
                roles: user.publicMetadata["roles"] as string[],
            },
            resource: {
                kind: "payment_method",
                id: methodId,
            },
            action: "delete",
        });

        if (!isAllowed) throw new ApiError("Access denied!", 401);

        const deletedMethod = await getInjection("IRemovePaymentMethodUseCase")(
            methodId
        );

        return successResponse(c, { data: deletedMethod });
    } catch (e) {
        if (e instanceof NotFoundError) throw new ApiError(e.message, 404);
        throw e;
    }
}
