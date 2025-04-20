import { IProfileBalancesRepository } from "../../repositories/profile_balances/profile-balances.repository.interface.ts";

export type IGetProfileBalanceUseCase = ReturnType<
    typeof getProfileBalanceUseCase
>;
export const getProfileBalanceUseCase =
    (profileBalancesRepository: IProfileBalancesRepository) =>
    (userId: string) => {
        return profileBalancesRepository.getProfileBalance(userId);
    };
