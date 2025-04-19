import {
    CheckResourceOptions,
    IAuthorizationService,
} from "../../repositories/auth/authorization.service.interface.ts";

export type ICheckResourcesAccessUseCase = ReturnType<
    typeof checkResourcesAccessUseCase
>;

export const checkResourcesAccessUseCase =
    (authorizationService: IAuthorizationService) =>
    (opts: CheckResourceOptions) => {
        return authorizationService.checkResources(opts);
    };
