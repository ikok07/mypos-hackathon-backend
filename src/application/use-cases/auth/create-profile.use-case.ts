import { ProfileInsert } from "../../../drizzle/schema/profiles.ts";
import { IProfilesRepository } from "../../repositories/auth/auth/profiles.repository.interface.ts";

export type ICreateProfileUseCase = ReturnType<typeof createProfileUseCase>;

export const createProfileUseCase =
  (profilesRepository: IProfilesRepository) => (data: ProfileInsert) => {
    return profilesRepository.createProfile(data);
  };
