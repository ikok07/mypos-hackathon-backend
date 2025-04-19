import { IProfilesRepository } from "../../application/repositories/auth/profiles/profiles.repository.interface.ts";
import { ICreateProfileUseCase } from "../../application/use-cases/auth/profiles/create-profile.use-case.ts";
import { IDeleteProfileUseCase } from "../../application/use-cases/auth/profiles/delete-profile.use-case.ts";
import { IGetProfileUseCase } from "../../application/use-cases/auth/profiles/get-profile.use-case.ts";

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
