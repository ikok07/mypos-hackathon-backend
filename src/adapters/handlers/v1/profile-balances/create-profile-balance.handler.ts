import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";
import { profileBalancesInsertSchema } from "../../../../drizzle/schema/profile_balances.ts";

export async function createProfileBalanceHandler(c: Context, next: Next) {
    const { data: body, error: bodyError } =
        profileBalancesInsertSchema.safeParse(await c.req.json());
    if (bodyError) throw new ApiError("Invalid body!", 400);

    const user = await getInjection("IGetUserByIdUseCase")(c.get("userId"));

    const isAllowed = await getInjection("ICheckAccessUseCase")({
        principal: {
            id: c.get("userId"),
            roles: user.publicMetadata["roles"] as string[],
        },
        resource: {
            kind: "profile_balance",
            id: c.get("userId"),
        },
        action: "insert",
    });

    if (!isAllowed) throw new ApiError("Access denied!", 401);

    const balance = await getInjection("ICreateProfileBalanceUseCase")(body);
    return successResponse(c, { data: balance });
}
