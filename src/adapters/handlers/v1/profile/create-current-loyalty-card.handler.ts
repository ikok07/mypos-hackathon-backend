import { Context, Next } from "hono";
import { loyaltyCardsInsertSchema } from "../../../../drizzle/schema/loyalty_cards.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { getInjection } from "../../../../di/container.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";

export async function createCurrentLoyaltyCardHandler(c: Context, next: Next) {
    const { data: body, error: bodyError } = loyaltyCardsInsertSchema
        .omit({ profile_id: true })
        .safeParse(await c.req.json());
    if (bodyError) throw new ApiError("Invalid body!", 400);

    if (body.expiry_date * 1000 < Date.now())
        throw new ApiError("Expiration date cannot be in the past!", 400);

    const card = await getInjection("ICreateCardUseCase")({
        profile_id: c.get("userId"),
        expiry_date: body.expiry_date,
    });

    return successResponse(c, { data: card });
}
