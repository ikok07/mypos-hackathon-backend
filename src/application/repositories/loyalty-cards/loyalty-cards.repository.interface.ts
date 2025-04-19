import { LoyaltyCards } from "../../../drizzle/schema/loyalty_cards.ts";

export interface ILoyaltyCardsRepository {
    getCardById(cardId: string): Promise<LoyaltyCards>;
    getCardByProfileId(profileId: string): Promise<LoyaltyCards>;
}
