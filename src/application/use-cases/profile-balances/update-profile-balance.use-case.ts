import {
    IProfileBalancesRepository,
    UpdateProfileBalanceData,
} from "../../repositories/profile_balances/profile-balances.repository.interface.ts";

export type IUpdateProfileBalanceUseCase = ReturnType<
    typeof updateProfileBalanceUseCase
>;
export const updateProfileBalanceUseCase =
    (profileBalancesRepository: IProfileBalancesRepository) =>
    (userId: string, data: UpdateProfileBalanceData) => {
        return profileBalancesRepository.updateProfileBalanceAmount(
            userId,
            data
        );
    };
