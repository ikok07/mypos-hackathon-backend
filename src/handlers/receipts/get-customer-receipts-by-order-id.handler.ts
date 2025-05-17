import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { receiptsTable } from "../../drizzle/schema/receipts";
import { eq } from "drizzle-orm";

export async function getCustomerReceiptsByOrderIdHandler(req: Request, res: Response) {
  const orderId = req.params.orderId;
  if (!orderId) throw new AppError(400, "Missing order id!");

  const resp = await Database.queryDb(db => {
    return db.select().from(receiptsTable).where(eq(receiptsTable.order_id, orderId));
  });

  res.status(200).json({
    status: "success",
    data: resp
  })
}