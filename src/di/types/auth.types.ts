import { IAuthService } from "../../application/services/auth/auth.service.interface.ts";
import { IGetUserByIdUseCase } from "../../application/use-cases/auth/get-user-by-id.use-case.ts";
import { IUpdateUserMetadataUseCase } from "../../application/use-cases/auth/update-user-metadata.use-case.ts";
import { IValidateUserUseCase } from "../../application/use-cases/auth/validate-user.use-case.ts";

export const AUTH_SYMBOLS = {
    IAuthService: Symbol.for("IAuthService"),

    IValidateUserUseCase: Symbol.for("IValidateUserUseCase"),
    IGetUserByIdUseCase: Symbol.for("IGetUserByIdUseCase"),
    IUpdateUserMetadataUseCase: Symbol.for("IUpdateUserMetadataUseCase"),
};

export interface AUTH_RETURN_TYPES {
    IAuthService: IAuthService;
    IValidateUserUseCase: IValidateUserUseCase;
    IGetUserByIdUseCase: IGetUserByIdUseCase;
    IUpdateUserMetadataUseCase: IUpdateUserMetadataUseCase;
}
