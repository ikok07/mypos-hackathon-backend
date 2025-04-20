import { LoyaltyCardsInsert } from "../../../drizzle/schema/loyalty_cards.ts";
import { ILoyaltyCardsRepository } from "../../repositories/loyalty-cards/loyalty-cards.repository.interface.ts";

export type ICreateCardUseCase = ReturnType<typeof createCardUseCase>;
export const createCardUseCase =
    (loyaltyCardsRepository: ILoyaltyCardsRepository) =>
    (card: LoyaltyCardsInsert) => {
        return loyaltyCardsRepository.createCard(card);
    };
