import { IProfileBalancesRepository } from "../../application/repositories/profile_balances/profile-balances.repository.interface.ts";
import { ICreateProfileBalanceUseCase } from "../../application/use-cases/profile-balances/create-profile-balance.use-case.ts";
import { IGetProfileBalanceUseCase } from "../../application/use-cases/profile-balances/get-profile-balance.use-case.ts";
import { IUpdateProfileBalanceUseCase } from "../../application/use-cases/profile-balances/update-profile-balance.use-case.ts";

export const PROFILE_BALANCES_SYMBOLS = {
    IProfileBalancesRepository: Symbol.for("IProfileBalancesRepository"),
    IGetProfileBalanceUseCase: Symbol.for("IGetProfileBalanceUseCase"),
    ICreateProfileBalanceUseCase: Symbol.for("ICreateProfileBalanceUseCase"),
    IUpdateProfileBalanceUseCase: Symbol.for("IUpdateProfileBalanceUseCase"),
};

export interface PROFILE_BALANCES_TYPES {
    IProfileBalancesRepository: IProfileBalancesRepository;
    IGetProfileBalanceUseCase: IGetProfileBalanceUseCase;
    ICreateProfileBalanceUseCase: ICreateProfileBalanceUseCase;
    IUpdateProfileBalanceUseCase: IUpdateProfileBalanceUseCase;
}
