import {
    AuthObject,
    ClerkClient,
    createClerkClient,
    User,
} from "@clerk/backend";
import {
    IAuthService,
    UserMetadataParams,
} from "../../../application/services/auth/auth.service.interface.ts";
import { AuthenticationError } from "../../../entities/models/errors/auth/AuthenticationError.ts";

export class ClerkService implements IAuthService {
    client: ClerkClient;
    constructor() {
        this.client = createClerkClient({
            secretKey: Deno.env.get("CLERK_SECRET_KEY"),
            publishableKey: Deno.env.get("CLERK_PUBLISHABLE_KEY"),
        });
    }
    async validateUser(
        request: Request
    ): Promise<{ isSignedIn: boolean; auth: AuthObject | null }> {
        try {
            const { isSignedIn, toAuth } =
                await this.client.authenticateRequest(request, {
                    jwtKey: Deno.env.get("CLERK_JWKS_PUBLIC_KEY"),
                    // authorizedParties: [""]
                });
            return {
                isSignedIn,
                auth: toAuth(),
            };
        } catch (e) {
            throw new AuthenticationError(`Failed to validate user! ${e}`);
        }
    }

    getUserById(userId: string): Promise<User> {
        try {
            return this.client.users.getUser(userId);
        } catch (e) {
            throw new AuthenticationError(`Failed to get user by id! ${e}`);
        }
    }

    updateUserMetadata(
        userId: string,
        params: UserMetadataParams
    ): Promise<User> {
        try {
            return this.client.users.updateUserMetadata(userId, params);
        } catch (e) {
            throw new AuthenticationError(
                `Failed to update user metadata! ${e}`
            );
        }
    }
}
