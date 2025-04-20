import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { loyaltyCardsInsertSchema } from "../../../../drizzle/schema/loyalty_cards.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";

export async function createLoyaltyCardHandler(c: Context, next: Next) {
    const { data: body, error: bodyError } = loyaltyCardsInsertSchema.safeParse(
        await c.req.json()
    );
    if (bodyError) throw new ApiError("Invalid body!", 400);

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

    const card = await getInjection("ICreateCardUseCase")(body);
    return successResponse(c, { data: card });
}
