import { Context, Next } from "hono";
import { getInjection } from "../../../../../di/container.ts";
import { AuthorizationError } from "../../../../../entities/models/errors/auth/AuthorizationError.ts";
import { z } from "zod";
import { ApiError } from "../../../../../entities/models/errors/ApiError.ts";
import { successResponse } from "../../../../../entities/utils/handlers/successResponse.ts";

export const bodySchema = z.object({
    date_enter: z.number(),
    date_exit: z.number(),
});

export async function addCustomerVisitHandler(c: Context, next: Next) {
    const { data: body, error: bodyError } = bodySchema.safeParse(
        await c.req.json()
    );
    if (bodyError) throw new ApiError("Invalid body!", 400);

    const customerUserId = c.req.param("userId");

    const getUserUseCase = getInjection("IGetUserByIdUseCase");
    const user = await getUserUseCase(c.get("userId"));

    const checkAccessUseCase = getInjection("ICheckAccessUseCase");
    const isAllowed = await checkAccessUseCase({
        principal: {
            id: c.get("userId"),
            roles: user.publicMetadata["roles"] as string[],
        },
        resource: {
            kind: "customer_visits",
            id: customerUserId, // using customer's id because it's not important here
        },
        action: "insert",
    });
    if (!isAllowed) throw new ApiError("Access denied!", 401);

    const addCustomerVisitsUseCase = getInjection("IAddCustomerVisitUseCase");
    await addCustomerVisitsUseCase({
        profile_id: customerUserId,
        date_enter: body.date_enter,
        date_exit: body.date_exit,
    });

    return successResponse(c);
}
