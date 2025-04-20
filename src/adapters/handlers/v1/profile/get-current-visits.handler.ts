import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";

export async function getCurrentVisitsHandler(c: Context, next: Next) {
    const getCustomerVisitsUseCase = getInjection("IGetCustomerVisitsUseCase");
    const visits = await getCustomerVisitsUseCase(c.get("userId"));

    return successResponse(c, { data: visits });
}
