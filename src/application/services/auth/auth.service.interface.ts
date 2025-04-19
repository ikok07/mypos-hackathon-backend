import { AuthObject, User } from "@clerk/backend";
import { z } from "zod";

export const userMetadataParamsSchema = z.object({
    publicMetadata: z.custom<UserPublicMetadata>().optional(),
    privateMetadata: z.custom<UserPrivateMetadata>().optional(),
    unsafeMetadata: z.custom<UserUnsafeMetadata>().optional(),
});

export type UserMetadataParams = z.infer<typeof userMetadataParamsSchema>;

export interface IAuthService {
    validateUser(
        request: Request
    ): Promise<{ isSignedIn: boolean; auth: AuthObject | null }>;
    getUserById(userId: string): Promise<User>;
    updateUserMetadata(
        userId: string,
        params: UserMetadataParams
    ): Promise<User>;
}
