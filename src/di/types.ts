import { AUTH_RETURN_TYPES, AUTH_SYMBOLS } from "./types/auth.types.ts";
import {
    CUSTOMER_VISITS_CARDS_SYMBOLS,
    CUSTOMER_VISITS_CARDS_TYPES,
} from "./types/customer-visits.types.ts";
import {
    LOYALTY_CARDS_SYMBOLS,
    LOYALTY_CARDS_TYPES,
} from "./types/loyalty-cards.types.ts";
import {
    PAYMENT_METHODS_SYMBOLS,
    PAYMENT_METHODS_TYPES,
} from "./types/payment-methods.types copy.ts";
import {
    PROFILE_BALANCES_SYMBOLS,
    PROFILE_BALANCES_TYPES,
} from "./types/profile-balances.types.ts";
import {
    PROFILES_RETURN_TYPES,
    PROFILES_SYMBOLS,
} from "./types/profiles.types.ts";

export const DI_SYMBOLS = {
    ...PROFILES_SYMBOLS,
    ...AUTH_SYMBOLS,
    ...LOYALTY_CARDS_SYMBOLS,
    ...CUSTOMER_VISITS_CARDS_SYMBOLS,
    ...PAYMENT_METHODS_SYMBOLS,
    ...PROFILE_BALANCES_SYMBOLS,
};

export interface DI_RETURN_TYPES
    extends PROFILES_RETURN_TYPES,
        AUTH_RETURN_TYPES,
        LOYALTY_CARDS_TYPES,
        CUSTOMER_VISITS_CARDS_TYPES,
        PAYMENT_METHODS_TYPES,
        PROFILE_BALANCES_TYPES {}
