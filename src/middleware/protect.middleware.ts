import { NextFunction, Request, Response } from "express";
import { AppError } from "../models/errors/app-error";
import { hashToken } from "../utils/hash-token";
import { Database } from "../utils/database";
import { sessionTokensTable } from "../drizzle/schema/session_tokens";
import { eq } from "drizzle-orm";

export async function protectMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string | undefined;

    if (!token) throw new AppError(401, "Unauthorized");

    const resp = await Database.queryDb(db => {
        return db.select().from(sessionTokensTable).where(eq(sessionTokensTable.hashed_token, hashToken(token)));
    });
    if (resp.length === 0) throw new AppError(401, "Unauthorized");

    next();
}