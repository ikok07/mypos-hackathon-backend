import { IAuthService } from "../../services/auth/auth.service.interface.ts";

export type IGetUserByIdUseCase = ReturnType<typeof getUserByIdUseCase>;
export const getUserByIdUseCase =
    (authService: IAuthService) => (userId: string) => {
        return authService.getUserById(userId);
    };
