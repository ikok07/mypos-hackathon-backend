import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types.ts";
import { ProfilesRepository } from "../../infrastructure/repositories/auth/profiles.repository.ts";
import { getProfileUseCase } from "../../application/use-cases/auth/get-profile.use-case.ts";
import { deleteProfileUseCase } from "../../application/use-cases/auth/delete-profile.use-case.ts";
import { createProfileUseCase } from "../../application/use-cases/auth/create-profile.use-case.ts";

export function createProfilesModule() {
  const profilesModule = createModule();

  profilesModule
    .bind(DI_SYMBOLS.IProfilesRepository)
    .toClass(ProfilesRepository);

  profilesModule
    .bind(DI_SYMBOLS.IGetProfileUseCase)
    .toHigherOrderFunction(getProfileUseCase, [DI_SYMBOLS.IProfilesRepository]);

  profilesModule
    .bind(DI_SYMBOLS.ICreateProfileUseCase)
    .toHigherOrderFunction(createProfileUseCase, [
      DI_SYMBOLS.IProfilesRepository,
    ]);

  profilesModule
    .bind(DI_SYMBOLS.IDeleteProfileUseCase)
    .toHigherOrderFunction(deleteProfileUseCase, [
      DI_SYMBOLS.IProfilesRepository,
    ]);

  return profilesModule;
}
