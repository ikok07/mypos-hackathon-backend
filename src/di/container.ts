import { createContainer } from "@evyweb/ioctopus";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types.ts";
import { createProfilesModule } from "./modules/profiles.module.ts";
import { createAuthModule } from "./modules/auth.module.ts";
import { createLoyaltyCardsModule } from "./modules/loyalty-cards.module.ts";
import { createCustomerVisitsModule } from "./modules/customer-visits.module.ts";
import { createPaymentMethodsModule } from "./modules/payment-methods.module.ts";
import { createProfileBalancesModule } from "./modules/profile-balances.module.ts";

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("AuthModule"), createAuthModule());
ApplicationContainer.load(Symbol("ProfilesModule"), createProfilesModule());
ApplicationContainer.load(
    Symbol("LoyaltyCardsModule"),
    createLoyaltyCardsModule()
);
ApplicationContainer.load(
    Symbol("CustomerVisitsModule"),
    createCustomerVisitsModule()
);
ApplicationContainer.load(
    Symbol("PaymentMethodsModule"),
    createPaymentMethodsModule()
);
ApplicationContainer.load(
    Symbol("ProfileBalancesModule"),
    createProfileBalancesModule()
);

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
