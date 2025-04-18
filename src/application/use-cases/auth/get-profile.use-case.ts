import { IProfilesRepository } from "../../repositories/auth/auth/profiles.repository.interface.ts";

export type IGetProfileUseCase = ReturnType<typeof getProfileUseCase>;

export const getProfileUseCase =
  (profilesRepository: IProfilesRepository) => (userId: string) => {
    return profilesRepository.getProfileById(userId);
  };
