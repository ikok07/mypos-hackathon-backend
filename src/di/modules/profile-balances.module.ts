import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types.ts";
import { ProfileBalancesRepository } from "../../infrastructure/repositories/profile_balances/profile-balances.repository.ts";
import { getProfileBalanceUseCase } from "../../application/use-cases/profile-balances/get-profile-balance.use-case.ts";
import { updateProfileBalanceUseCase } from "../../application/use-cases/profile-balances/update-profile-balance.use-case.ts";
import { createProfileBalanceUseCase } from "../../application/use-cases/profile-balances/create-profile-balance.use-case.ts";

export function createProfileBalancesModule() {
    const profileBalancesModule = createModule();

    profileBalancesModule
        .bind(DI_SYMBOLS.IProfileBalancesRepository)
        .toClass(ProfileBalancesRepository);

    profileBalancesModule
        .bind(DI_SYMBOLS.IGetProfileBalanceUseCase)
        .toHigherOrderFunction(getProfileBalanceUseCase, [
            DI_SYMBOLS.IProfileBalancesRepository,
        ]);

    profileBalancesModule
        .bind(DI_SYMBOLS.ICreateProfileBalanceUseCase)
        .toHigherOrderFunction(createProfileBalanceUseCase, [
            DI_SYMBOLS.IProfileBalancesRepository,
        ]);

    profileBalancesModule
        .bind(DI_SYMBOLS.IUpdateProfileBalanceUseCase)
        .toHigherOrderFunction(updateProfileBalanceUseCase, [
            DI_SYMBOLS.IProfileBalancesRepository,
        ]);

    return profileBalancesModule;
}
