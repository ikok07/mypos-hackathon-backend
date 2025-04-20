import { ProfileBalancesInsert } from "../../../drizzle/schema/profile_balances.ts";
import { IProfileBalancesRepository } from "../../repositories/profile_balances/profile-balances.repository.interface.ts";

export type ICreateProfileBalanceUseCase = ReturnType<
    typeof createProfileBalanceUseCase
>;
export const createProfileBalanceUseCase =
    (profileBalancesRepository: IProfileBalancesRepository) =>
    (balance: ProfileBalancesInsert) => {
        return profileBalancesRepository.createProfileBalance(balance);
    };
