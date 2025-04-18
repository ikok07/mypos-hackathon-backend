import { eq } from "drizzle-orm";
import { IProfilesRepository } from "../../../application/repositories/auth/auth/profiles.repository.interface.ts";
import {
  ProfileInsert,
  Profile,
  profilesTable,
} from "../../../drizzle/schema/profiles.ts";
import { DatabaseError } from "../../../entities/models/errors/db/database.ts";
import { BaseRepository } from "../base-class.repository.ts";

export class ProfilesRepository
  extends BaseRepository
  implements IProfilesRepository
{
  async getProfileById(id: string): Promise<Profile> {
    try {
      const result = await this.queryDB((db) => {
        return db.query.profilesTable.findFirst({
          where: eq(profilesTable.id, id),
        });
      });
      if (!result) throw new Error("Could not find profile with this ID!");

      return result;
    } catch (e) {
      throw new DatabaseError(`Failed to get profile: ${e}`);
    }
  }
  createProfile(profile: ProfileInsert): Promise<Profile> {
    try {
      return this.queryDB(async (db) => {
        return (
          await db.insert(profilesTable).values(profile).returning().execute()
        )[0];
      });
    } catch (e) {
      throw new DatabaseError(`Failed to create profile: ${e}`);
    }
  }
  deleteProfileById(id: string): Promise<void> {
    try {
      return this.queryDB(async (db) => {
        await db
          .delete(profilesTable)
          .where(eq(profilesTable.id, id))
          .execute();
      });
    } catch (e) {
      throw new DatabaseError(`Failed to delete profile: ${e}`);
    }
  }
}
