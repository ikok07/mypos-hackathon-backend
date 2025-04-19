import { ILoyaltyCardsRepository } from "../../application/repositories/loyalty-cards/loyalty-cards.repository.interface.ts";
import { IGetCardByIdUseCase } from "../../application/use-cases/loyalty-cards/get-card-by-id.use-case.ts";
import { IGetCardByProfileIdUseCase } from "../../application/use-cases/loyalty-cards/get-card-by-profile-id.use-case.ts";

export const LOYALTY_CARDS_SYMBOLS = {
    ILoyaltyCardsRepository: Symbol.for("ILoyaltyCardsRepository"),
    IGetCardByIdUseCase: Symbol.for("IGetCardByIdUseCase"),
    IGetCardByProfileIdUseCase: Symbol.for("IGetCardByProfileIdUseCase"),
};

export interface LOYALTY_CARDS_TYPES {
    ILoyaltyCardsRepository: ILoyaltyCardsRepository;

    IGetCardByIdUseCase: IGetCardByIdUseCase;
    IGetCardByProfileIdUseCase: IGetCardByProfileIdUseCase;
}
