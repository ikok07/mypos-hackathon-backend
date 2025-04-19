import { AUTH_RETURN_TYPES, AUTH_SYMBOLS } from "./types/auth.types.ts";
import {
    LOYALTY_CARDS_SYMBOLS,
    LOYALTY_CARDS_TYPES,
} from "./types/loyalty-cards.types.ts";
import {
    PROFILES_RETURN_TYPES,
    PROFILES_SYMBOLS,
} from "./types/profiles.types.ts";

export const DI_SYMBOLS = {
    ...PROFILES_SYMBOLS,
    ...AUTH_SYMBOLS,
    ...LOYALTY_CARDS_SYMBOLS,
};

export interface DI_RETURN_TYPES
    extends PROFILES_RETURN_TYPES,
        AUTH_RETURN_TYPES,
        LOYALTY_CARDS_TYPES {}
