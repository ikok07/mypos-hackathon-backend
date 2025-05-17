import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { profileBalancesTable } from "../../drizzle/schema/profile_balances";
import { eq } from "drizzle-orm";

export async function getProfileBalanceHandler(req: Request, res: Response) {
  const userId = req.params.userId;
  if (!userId) throw new AppError(400, "Missing user id!");

  const resp = await Database.queryDb(db => {
    return db.select().from(profileBalancesTable).where(eq(profileBalancesTable.profile_id, userId));
  });

  if (resp.length === 0) throw new AppError(404, "Profile balance not found!");

  res.status(200).json({
    status: "success",
    data: resp[0]
  })
}