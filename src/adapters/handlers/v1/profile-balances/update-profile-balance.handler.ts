import { Context, Next } from "hono";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";
import { getInjection } from "../../../../di/container.ts";
import { updateProfileBalanceDataSchema } from "../../../../application/repositories/profile_balances/profile-balances.repository.interface.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";
import { NotFoundError } from "../../../../entities/models/errors/NotFoundError.ts";

export async function updateProfileBalanceHandler(c: Context, next: Next) {
    try {
        const { data: body, error: bodyError } =
            updateProfileBalanceDataSchema.safeParse(await c.req.json());
        if (bodyError) throw new ApiError("Invalid body!", 400);

        if (
            (!!body.amount_bgn && body.amount_bgn < 0) ||
            (!!body.amount_credits && body.amount_credits < 0)
        ) {
            throw new ApiError("Invalid amount!", 400);
        }

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
            action: "insert",
        });

        if (!isAllowed) throw new ApiError("Access denied!", 401);

        const balance = await getInjection("IUpdateProfileBalanceUseCase")(
            c.req.param("userId"),
            body
        );

        return successResponse(c, { data: balance });
    } catch (e) {
        if (e instanceof NotFoundError) throw new ApiError(e.message, 404);
        throw e;
    }
}
