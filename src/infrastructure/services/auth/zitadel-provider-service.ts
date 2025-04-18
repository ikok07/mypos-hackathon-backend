import {
  getAccessTokenScheme,
  getAuthURLScheme,
  IIdentityProviderService,
  refreshAccesstokenScheme,
} from "../../../application/services/identity-provider.interface.ts";
import z from "zod";
import axios from "axios";
import { AuthenticationError } from "../../../entities/models/errors/auth/AuthenticationError.ts";
import { User, userScheme } from "../../../entities/models/auth/user.ts";

export class ZitadelProviderService implements IIdentityProviderService {
  baseUrl = Deno.env.get("IP_URL");
  clientId = Deno.env.get("IP_CLIENT_ID") ?? "no-id";
  organizationId = Deno.env.get("IP_ORG_ID") ?? "no-id";

  async getUser(accessToken: string): Promise<User | undefined> {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/oidc/v1/userinfo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return userScheme.parse(data);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  getAuthenticateURL({
    redirectUrl,
    locale,
    codeChallenge,
  }: z.infer<typeof getAuthURLScheme>): string {
    const params = new URLSearchParams();
    params.set("client_id", this.clientId);
    params.set("organization_id", this.organizationId);
    params.set("response_type", "code");
    params.set("code_challenge_method", "S256");
    params.set("redirect_uri", redirectUrl);
    params.set("ui_locales", locale);
    params.set(
      "scope",
      `openid offline_access profile email phone urn:zitadel:iam:org:projects:roles urn:zitadel:iam:org:id:${this.organizationId}`
    );
    params.set("code_challenge", codeChallenge);

    return `${
      Deno.env.get("IP_EXTERNAL_URL") ?? this.baseUrl
    }/oauth/v2/authorize?${params}`;
  }

  async getAccessToken({
    redirectUrl,
    code,
    codeVerifier,
  }: z.infer<typeof getAccessTokenScheme>): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const params = new URLSearchParams();
      params.set("grant_type", "authorization_code");
      params.set("code", code);
      params.set("redirect_uri", redirectUrl);
      params.set("client_id", this.clientId);
      params.set("code_verifier", codeVerifier);

      const response = await axios.post(
        `${this.baseUrl}/oauth/v2/token?${params}`
      );
      const { data, error } = z
        .object({ refresh_token: z.string(), access_token: z.string() })
        .safeParse(response.data);

      if (error) throw new Error("No access or refresh token found!");

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    } catch (err) {
      throw new AuthenticationError(
        `Could not get access or refresh token! ${err}`
      );
    }
  }

  async refreshAccessToken(
    opts: z.infer<typeof refreshAccesstokenScheme>
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const params = new URLSearchParams();
      params.set("grant_type", "refresh_token");
      params.set(
        "scope",
        "openid offline_access profile email phone urn:zitadel:iam:org:projects:roles"
      );
      params.set("client_id", this.clientId);
      params.set("refresh_token", opts.refreshToken);

      const response = await axios.post(
        `${this.baseUrl}/oauth/v2/token?${params}`
      );

      const { data, error } = z
        .object({ refresh_token: z.string(), access_token: z.string() })
        .safeParse(response.data);

      if (error) throw new Error("No access or refresh token found!");

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    } catch (err) {
      throw new AuthenticationError(`Could not refresh access token! ${err}`);
    }
  }
}
