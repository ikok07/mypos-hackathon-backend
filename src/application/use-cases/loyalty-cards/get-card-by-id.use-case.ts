import { ILoyaltyCardsRepository } from "../../repositories/loyalty-cards/loyalty-cards.repository.interface.ts";

export type IGetCardByIdUseCase = ReturnType<typeof getCardByIdUseCase>;
export const getCardByIdUseCase =
    (loyaltyCardsRepository: ILoyaltyCardsRepository) => (userId: string) => {
        return loyaltyCardsRepository.getCardById(userId);
    };
