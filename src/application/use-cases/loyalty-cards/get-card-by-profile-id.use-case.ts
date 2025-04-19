import { ILoyaltyCardsRepository } from "../../repositories/loyalty-cards/loyalty-cards.repository.interface.ts";

export type IGetCardByProfileIdUseCase = ReturnType<
    typeof getCardByProfileIdUseCase
>;
export const getCardByProfileIdUseCase =
    (loyaltyCardsRepository: ILoyaltyCardsRepository) =>
    (profileId: string) => {
        return loyaltyCardsRepository.getCardByProfileId(profileId);
    };
