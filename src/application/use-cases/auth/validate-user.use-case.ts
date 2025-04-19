import {
    IAuthService,
    ValidateUserOptions,
} from "../../services/auth/auth.service.interface.ts";

export type IValidateUserUseCase = ReturnType<typeof validateUserUseCase>;
export const validateUserUseCase =
    (authService: IAuthService) =>
    (request: Request, options?: ValidateUserOptions) => {
        return authService.validateUser(request, options);
    };
