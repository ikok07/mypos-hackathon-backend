import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";
import { NotFoundError } from "../../../../entities/models/errors/NotFoundError.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";

export async function getCurrentLoyaltyCardHandler(c: Context, next: Next) {
    try {
        const getCardByProfileIdUseCase = getInjection(
            "IGetCardByProfileIdUseCase"
        );
        const result = await getCardByProfileIdUseCase(c.get("userId"));

        return successResponse(c, { data: result });
    } catch (e) {
        if (e instanceof NotFoundError) throw new ApiError(e.message, 404);
        throw e;
    }
}
