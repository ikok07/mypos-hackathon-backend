import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";
import { NotFoundError } from "../../../../entities/models/errors/NotFoundError.ts";

export async function getLoyaltyCardByCardIdHandler(c: Context, next: Next) {
    try {
        const cardId = c.req.param("cardId");

        const getUserUseCase = getInjection("IGetUserByIdUseCase");
        const user = await getUserUseCase(c.get("userId"));

        const checkAccessUseCase = getInjection("ICheckAccessUseCase");
        const isAllowed = await checkAccessUseCase({
            principal: {
                id: user.id,
                roles: user.publicMetadata["roles"] as string[],
            },
            resource: {
                kind: "customer_loyalty_card",
                id: cardId,
            },
            action: "select",
        });
        if (!isAllowed) throw new ApiError("Access denied!", 401);

        const getCardByIdUseCase = getInjection("IGetCardByIdUseCase");
        const card = await getCardByIdUseCase(cardId);

        return successResponse(c, { data: card });
    } catch (e) {
        if (e instanceof NotFoundError) throw new ApiError(e.message, 404);
        throw e;
    }
}
