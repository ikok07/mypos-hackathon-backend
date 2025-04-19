import { IAuthorizationService } from "../../application/repositories/auth/authorization.service.interface.ts";
import { IAuthService } from "../../application/services/auth/auth.service.interface.ts";
import { ICheckAccessUseCase } from "../../application/use-cases/auth/check-access.use-case.ts";
import { ICheckResourcesAccessUseCase } from "../../application/use-cases/auth/check-resources-access.use-case.ts";
import { IGetUserByIdUseCase } from "../../application/use-cases/auth/get-user-by-id.use-case.ts";
import { IUpdateUserMetadataUseCase } from "../../application/use-cases/auth/update-user-metadata.use-case.ts";
import { IValidateUserUseCase } from "../../application/use-cases/auth/validate-user.use-case.ts";

export const AUTH_SYMBOLS = {
    IAuthService: Symbol.for("IAuthService"),
    IAuthorizationService: Symbol.for("IAuthorizationService"),

    IValidateUserUseCase: Symbol.for("IValidateUserUseCase"),
    IGetUserByIdUseCase: Symbol.for("IGetUserByIdUseCase"),
    IUpdateUserMetadataUseCase: Symbol.for("IUpdateUserMetadataUseCase"),

    ICheckAccessUseCase: Symbol.for("ICheckAccessUseCase"),
    ICheckResourcesAccessUseCase: Symbol.for("ICheckResourcesAccessUseCase"),
};

export interface AUTH_RETURN_TYPES {
    IAuthService: IAuthService;
    IAuthorizationService: IAuthorizationService;

    IValidateUserUseCase: IValidateUserUseCase;
    IGetUserByIdUseCase: IGetUserByIdUseCase;
    IUpdateUserMetadataUseCase: IUpdateUserMetadataUseCase;

    ICheckAccessUseCase: ICheckAccessUseCase;
    ICheckResourcesAccessUseCase: ICheckResourcesAccessUseCase;
}
