import {Buffer} from "node:buffer";

export function generateCodeVerifier(codeLength = 64) {
    let code = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let counter = 0;
    while (counter < codeLength) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return code;
}

export async function generateCodeChallenge(codeVerifier: string) {
    const digest = await crypto.subtle.digest("SHA-256",
        new TextEncoder().encode(codeVerifier));

    const base64 = Buffer.from(digest).toString("base64");

    // Convert Base64 to Base64URL (RFC 4648)
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}