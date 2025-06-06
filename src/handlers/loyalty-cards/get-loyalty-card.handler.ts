import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { loyaltyCardsTable } from "../../drizzle/schema/loyalty_cards";
import { eq } from "drizzle-orm";

export async function getLoyaltyCardHandler(req: Request, res: Response) {
  const userId = req.params.userId;
  if (!userId) throw new AppError(400, "Missing user id!");

  const resp = await Database.queryDb(db => {
    return db.select().from(loyaltyCardsTable).where(eq(loyaltyCardsTable.profile_id, userId));
  });
  if (resp.length === 0) throw new AppError(404, "Loyalty card not found!");

  res.status(200).json({
    status: "success",
    data: resp[0]
  })
}