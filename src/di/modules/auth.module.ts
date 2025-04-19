import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types.ts";
import { ClerkService } from "../../infrastructure/services/auth/clerk.service.ts";
import { getUserByIdUseCase } from "../../application/use-cases/auth/get-user-by-id.use-case.ts";
import { updateUserMetadataUseCase } from "../../application/use-cases/auth/update-user-metadata.use-case.ts";
import { validateUserUseCase } from "../../application/use-cases/auth/validate-user.use-case.ts";

export function createAuthModule() {
    const authModule = createModule();

    authModule.bind(DI_SYMBOLS.IAuthService).toClass(ClerkService);

    authModule
        .bind(DI_SYMBOLS.IValidateUserUseCase)
        .toHigherOrderFunction(validateUserUseCase, [DI_SYMBOLS.IAuthService]);

    authModule
        .bind(DI_SYMBOLS.IGetUserByIdUseCase)
        .toHigherOrderFunction(getUserByIdUseCase, [DI_SYMBOLS.IAuthService]);

    authModule
        .bind(DI_SYMBOLS.IUpdateUserMetadataUseCase)
        .toHigherOrderFunction(updateUserMetadataUseCase, [
            DI_SYMBOLS.IAuthService,
        ]);

    return authModule;
}
