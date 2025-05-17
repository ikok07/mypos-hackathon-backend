import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { customerVisitsTable } from "../../drizzle/schema/customer_visits";
import { eq } from "drizzle-orm";

export async function getCustomerVisitsHandler(req: Request, res: Response) {
  const userId = req.params.userId;
  if (!userId) throw new AppError(404, "Missing user id!");

  const resp = await Database.queryDb(db => {
    return db.select().from(customerVisitsTable).where(eq(customerVisitsTable.profile_id, userId));
  });

  res.status(200).json({
    status: "success",
    data: resp
  });
}