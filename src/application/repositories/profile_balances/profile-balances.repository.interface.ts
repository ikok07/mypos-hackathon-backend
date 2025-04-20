import { z } from "zod";
import {
    ProfileBalances,
    ProfileBalancesInsert,
} from "../../../drizzle/schema/profile_balances.ts";

export const updateProfileBalanceDataSchema = z.object({
    amount_bgn: z.number().optional(),
    amount_credits: z.number().optional(),
});
export type UpdateProfileBalanceData = z.infer<
    typeof updateProfileBalanceDataSchema
>;

export interface IProfileBalancesRepository {
    getProfileBalance(userId: string): Promise<ProfileBalances>;
    createProfileBalance(
        balance: ProfileBalancesInsert
    ): Promise<ProfileBalances>;
    updateProfileBalanceAmount(
        userId: string,
        data: UpdateProfileBalanceData
    ): Promise<ProfileBalances>;
}
