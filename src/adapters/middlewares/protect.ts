import { Context, Next } from "hono";
import { ApiError } from "../../entities/models/errors/ApiError.ts";
import { getInjection } from "../../di/container.ts";

export async function protect(c: Context, next: Next) {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) throw new ApiError("Missing authorization token!", 401);

    const validateUserUseCase = getInjection("IValidateUserUseCase");
    const validateResult = await validateUserUseCase(c.req.raw);

    if (!validateResult.isSignedIn || !validateResult.auth?.userId)
        throw new ApiError("Unauthorized!", 401);

    c.set("userId", validateResult.auth.userId);
    await next();
}
