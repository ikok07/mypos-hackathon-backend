import { ProfilesRepository } from "../../../infrastructure/repositories/auth/profiles.repository.ts";

export type IDeleteProfileUseCase = ReturnType<typeof deleteProfileUseCase>;

export const deleteProfileUseCase =
  (profilesRepository: ProfilesRepository) => (id: string) => {
    return profilesRepository.deleteProfileById(id);
  };
