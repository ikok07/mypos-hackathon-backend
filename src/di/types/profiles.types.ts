import { IProfilesRepository } from "../../application/repositories/auth/auth/profiles.repository.interface.ts";
import { ICreateProfileUseCase } from "../../application/use-cases/auth/create-profile.use-case.ts";
import { IDeleteProfileUseCase } from "../../application/use-cases/auth/delete-profile.use-case.ts";
import { IGetProfileUseCase } from "../../application/use-cases/auth/get-profile.use-case.ts";

export const PROFILES_SYMBOLS = {
  IProfilesRepository: Symbol.for("IProfilesRepository"),
  IGetProfileUseCase: Symbol.for("IGetProfileUseCase"),
  ICreateProfileUseCase: Symbol.for("ICreateProfileUseCase"),
  IDeleteProfileUseCase: Symbol.for("IDeleteProfileUseCase"),
};

export interface PROFILES_RETURN_TYPES {
  IProfilesRepository: IProfilesRepository;
  IGetProfileUseCase: IGetProfileUseCase;
  ICreateProfileUseCase: ICreateProfileUseCase;
  IDeleteProfileUseCase: IDeleteProfileUseCase;
}
