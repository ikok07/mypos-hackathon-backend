import { createContainer } from "@evyweb/ioctopus";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types.ts";
import { createProfilesModule } from "./modules/profiles.module.ts";

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("ProfilesModule"), createProfilesModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
