import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";

export async function getLoyaltyCardByUserIdHandler(c: Context, next: Next) {
    const user = await getInjection("IGetUserByIdUseCase")(c.get("userId"));

    const checkAccessUseCase = getInjection("ICheckAccessUseCase");
    const isAllowed = await checkAccessUseCase({
        principal: {
            id: user.id,
            roles: user.publicMetadata["roles"] as string[],
        },
        resource: {
            kind: "customer_loyalty_card",
            id: user.id,
        },
        action: "insert",
    });
    if (!isAllowed) throw new ApiError("Access denied!", 401);

    const card = await getInjection("IGetCardByProfileIdUseCase")(
        c.req.param("userId")
    );

    return successResponse(c, { data: card });
}
