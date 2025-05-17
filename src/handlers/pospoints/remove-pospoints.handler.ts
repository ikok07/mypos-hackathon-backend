import {Request, Response} from "express"
import { z } from "zod";
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { profileBalancesTable } from "../../drizzle/schema/profile_balances";
import { eq } from "drizzle-orm";

export const bodySchema = z.object({
  userId: z.string(),
  amount: z.number()
});

export async function removePospointsHandler(req: Request, res: Response) {
    const {data, error} = bodySchema.safeParse(req.body);
    if (error) throw new AppError(400, "Invalid body!");

    const currentBalance = await Database.queryDb(db => {
      return db.select().from(profileBalancesTable).where(eq(profileBalancesTable.profile_id, data.userId));
    });
    if (currentBalance.length === 0) throw new AppError(404, "Balance not found!");

    if (currentBalance[0].amount_credits < data.amount) throw new AppError(400, "Insufficient credits!");

    const resp = await Database.queryDb(db => {
      return db.update(profileBalancesTable).set({
        amount_credits: currentBalance[0].amount_credits - data.amount
      }).returning();
    });

    res.status(200).json({
      status: "success",
      data: resp
    });
}