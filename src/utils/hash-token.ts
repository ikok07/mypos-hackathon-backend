import crypto from "crypto"

export function hashToken(token: string): string {
  return crypto.createHmac("SHA256", process.env.BACKEND_TOKEN_SECRET!).update(token).digest("base64");
}