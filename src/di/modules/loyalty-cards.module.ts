import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types.ts";
import { LoyaltyCardsRepository } from "../../infrastructure/repositories/loyalty-cards/loyalty-cards.repository.ts";
import { getCardByIdUseCase } from "../../application/use-cases/loyalty-cards/get-card-by-id.use-case.ts";
import { getCardByProfileIdUseCase } from "../../application/use-cases/loyalty-cards/get-card-by-profile-id.use-case.ts";

export function createLoyaltyCardsModule() {
    const loyaltyCardsModule = createModule();

    loyaltyCardsModule
        .bind(DI_SYMBOLS.ILoyaltyCardsRepository)
        .toClass(LoyaltyCardsRepository);

    loyaltyCardsModule
        .bind(DI_SYMBOLS.IGetCardByIdUseCase)
        .toHigherOrderFunction(getCardByIdUseCase, [
            DI_SYMBOLS.ILoyaltyCardsRepository,
        ]);

    loyaltyCardsModule
        .bind(DI_SYMBOLS.IGetCardByProfileIdUseCase)
        .toHigherOrderFunction(getCardByProfileIdUseCase, [
            DI_SYMBOLS.ILoyaltyCardsRepository,
        ]);

    return loyaltyCardsModule;
}
