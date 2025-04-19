import { Profile, ProfileInsert } from "../../../../drizzle/schema/profiles.ts";

export interface IProfilesRepository {
    getProfileById(id: string): Promise<Profile>;
    createProfile(profle: ProfileInsert): Promise<Profile>;
    deleteProfileById(id: string): Promise<void>;
}
