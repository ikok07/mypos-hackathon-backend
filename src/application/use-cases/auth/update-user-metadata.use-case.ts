import {
    IAuthService,
    UserMetadataParams,
} from "../../services/auth/auth.service.interface.ts";

export type IUpdateUserMetadataUseCase = ReturnType<
    typeof updateUserMetadataUseCase
>;
export const updateUserMetadataUseCase =
    (authService: IAuthService) =>
    (userId: string, params: UserMetadataParams) => {
        return authService.updateUserMetadata(userId, params);
    };
