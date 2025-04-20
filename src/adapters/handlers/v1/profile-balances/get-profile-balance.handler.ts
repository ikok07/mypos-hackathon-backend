import { Context, Next } from "hono";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { getInjection } from "../../../../di/container.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";
import { NotFoundError } from "../../../../entities/models/errors/NotFoundError.ts";

export async function getProfileBalanceHandler(c: Context, next: Next) {
    try {
        const user = await getInjection("IGetUserByIdUseCase")(c.get("userId"));

        const isAllowed = await getInjection("ICheckAccessUseCase")({
            principal: {
                id: c.get("userId"),
                roles: user.publicMetadata["roles"] as string[],
            },
            resource: {
                kind: "profile_balance",
                id: c.req.param("userId"),
            },
            action: "select",
        });

        if (!isAllowed) throw new ApiError("Access denied!", 401);

        const balance = await getInjection("IGetProfileBalanceUseCase")(
            c.req.param("userId")
        );
        return successResponse(c, { data: balance });
    } catch (e) {
        if (e instanceof NotFoundError) throw new ApiError(e.message, 404);
        throw e;
    }
}
