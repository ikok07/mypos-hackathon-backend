import { Context, Next } from "hono";
import { getInjection } from "../../../../../di/container.ts";
import { successResponse } from "../../../../../entities/utils/handlers/successResponse.ts";

export async function getCurrentProfileByIdHandler(c: Context, next: Next) {
    const getProfileUseCase = getInjection("IGetProfileUseCase");
    const profile = await getProfileUseCase(c.get("userId"));

    return successResponse(c, { data: profile });
}
