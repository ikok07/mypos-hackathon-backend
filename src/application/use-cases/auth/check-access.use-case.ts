import {
    CheckUserAccessOptions,
    checkUserAccessOptionsSchema,
    IAuthorizationService,
} from "../../repositories/auth/authorization.service.interface.ts";

export type ICheckAccessUseCase = ReturnType<typeof checkAccessUseCase>;

export const checkAccessUseCase =
    (authorizationService: IAuthorizationService) =>
    (opts: Partial<CheckUserAccessOptions>) => {
        const parsedOptions = checkUserAccessOptionsSchema.parse(opts);
        return authorizationService.hasAccess(parsedOptions);
    };
