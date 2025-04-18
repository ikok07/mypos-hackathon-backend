import {
  PROFILES_RETURN_TYPES,
  PROFILES_SYMBOLS,
} from "./types/profiles.types.ts";

export const DI_SYMBOLS = {
  ...PROFILES_SYMBOLS,
};

export interface DI_RETURN_TYPES extends PROFILES_RETURN_TYPES {}
