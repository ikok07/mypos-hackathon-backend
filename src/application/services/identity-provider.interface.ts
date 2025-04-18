import z from "zod";
import { User } from "../../entities/models/auth/user.ts";

export const getAuthURLScheme = z.object({
  redirectUrl: z.string().url(),
  locale: z.string(),
  codeChallenge: z.string(),
});

export const getAccessTokenScheme = z.object({
  redirectUrl: z.string().url(),
  code: z.string(),
  codeVerifier: z.string(),
});

export const refreshAccesstokenScheme = z.object({
  refreshToken: z.string(),
});

export interface IIdentityProviderService {
  getUser(accessToken: string): Promise<User | undefined>;
  getAuthenticateURL(opts: z.infer<typeof getAuthURLScheme>): string;
  getAccessToken(
    opts: z.infer<typeof getAccessTokenScheme>
  ): Promise<{ accessToken: string; refreshToken: string }>;
  refreshAccessToken(
    opts: z.infer<typeof refreshAccesstokenScheme>
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
