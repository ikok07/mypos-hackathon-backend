import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";
import { NotFoundError } from "../../../../entities/models/errors/NotFoundError.ts";
import { ApiError } from "../../../../entities/models/errors/ApiError.ts";

export async function getCustomerVisitsHandler(c: Context, next: Next) {
    try {
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
                id: c.req.param("userId"), // using customer's id because it's not important here
            },
            action: "select",
        });
        if (!isAllowed) throw new ApiError("Access denied!");

        const getCustomerVisitsUseCase = getInjection(
            "IGetCustomerVisitsUseCase"
        );
        const visits = await getCustomerVisitsUseCase(c.req.param("userId"));

        return successResponse(c, { data: visits });
    } catch (e) {
        if (e instanceof NotFoundError) throw new ApiError(e.message, 404);
        throw e;
    }
}
