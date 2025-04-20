import { eq } from "drizzle-orm";
import {
    IProfileBalancesRepository,
    UpdateProfileBalanceData,
} from "../../../application/repositories/profile_balances/profile-balances.repository.interface.ts";
import {
    ProfileBalances,
    ProfileBalancesInsert,
    profileBalancesTable,
} from "../../../drizzle/schema/profile_balances.ts";
import { DatabaseError } from "../../../entities/models/errors/db/database.ts";
import { NotFoundError } from "../../../entities/models/errors/NotFoundError.ts";
import { BaseRepository } from "../base-class.repository.ts";

export class ProfileBalancesRepository
    extends BaseRepository
    implements IProfileBalancesRepository
{
    getProfileBalance(userId: string): Promise<ProfileBalances> {
        try {
            return this.queryDB(async (db) => {
                const result = await db.query.profileBalancesTable.findFirst({
                    where: eq(profileBalancesTable.profile_id, userId),
                });
                if (!result)
                    throw new NotFoundError(
                        "There is no profile balance for this profile!"
                    );
                return result;
            });
        } catch (e) {
            if (e instanceof NotFoundError) throw e;
            throw new DatabaseError(`Failed to get profile balance: ${e}`);
        }
    }
    createProfileBalance(
        balance: ProfileBalancesInsert
    ): Promise<ProfileBalances> {
        try {
            return this.queryDB(async (db) => {
                return (
                    await db
                        .insert(profileBalancesTable)
                        .values(balance)
                        .returning()
                )[0];
            });
        } catch (e) {
            throw new DatabaseError(`Failed to create profile balance: ${e}`);
        }
    }
    updateProfileBalanceAmount(
        userId: string,
        data: UpdateProfileBalanceData
    ): Promise<ProfileBalances> {
        try {
            return this.queryDB(async (db) => {
                const result = (
                    await db
                        .update(profileBalancesTable)
                        .set({
                            amount_bgn: data.amount_bgn,
                            amount_credits: data.amount_credits,
                        })
                        .where(eq(profileBalancesTable.profile_id, userId))
                        .returning()
                ).at(0);
                if (!result)
                    throw new NotFoundError(
                        "Profile balance for user could not be found!"
                    );
                return result;
            });
        } catch (e) {
            if (e instanceof NotFoundError) throw e;
            throw new DatabaseError(`Failed to create profile balance: ${e}`);
        }
    }
}
