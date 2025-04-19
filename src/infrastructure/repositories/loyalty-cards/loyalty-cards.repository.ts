import { eq } from "drizzle-orm";
import { ILoyaltyCardsRepository } from "../../../application/repositories/loyalty-cards/loyalty-cards.repository.interface.ts";
import {
    LoyaltyCards,
    loyaltyCardsTable,
} from "../../../drizzle/schema/loyalty_cards.ts";
import { DatabaseError } from "../../../entities/models/errors/db/database.ts";
import { BaseRepository } from "../base-class.repository.ts";
import { NotFoundError } from "../../../entities/models/errors/NotFoundError.ts";

export class LoyaltyCardsRepository
    extends BaseRepository
    implements ILoyaltyCardsRepository
{
    async getCardById(cardId: string): Promise<LoyaltyCards> {
        try {
            const data = await this.queryDB((db) => {
                return db.query.loyaltyCardsTable.findFirst({
                    where: eq(loyaltyCardsTable.id, cardId),
                });
            });

            if (!data)
                throw new NotFoundError(
                    "Loyalty card with this id could not be found!"
                );

            return data;
        } catch (e) {
            throw new DatabaseError(`Failed to get loyalty card! ${e}`);
        }
    }

    async getCardByProfileId(profileId: string): Promise<LoyaltyCards> {
        try {
            const data = await this.queryDB((db) => {
                return db.query.loyaltyCardsTable.findFirst({
                    where: eq(loyaltyCardsTable.profile_id, profileId),
                });
            });

            if (!data)
                throw new NotFoundError(
                    "Loyalty card with this profile id could not be found!"
                );

            return data;
        } catch (e) {
            if (e instanceof NotFoundError) throw e;
            throw new DatabaseError(`Failed to get loyalty card! ${e}`);
        }
    }
}
