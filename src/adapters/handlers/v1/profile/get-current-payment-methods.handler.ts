import { Context, Next } from "hono";
import { getInjection } from "../../../../di/container.ts";
import { successResponse } from "../../../../entities/utils/handlers/successResponse.ts";

export async function getCurrentPaymentMethodsHandler(c: Context, next: Next) {
    const getPaymentMethodsUseCase = getInjection("IGetPaymentMethodsUseCase");
    const methods = await getPaymentMethodsUseCase(c.get("userId"));

    return successResponse(c, { data: methods });
}
