import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { paymentOrdersTable } from "../../drizzle/schema/payment-orders";
import { eq } from "drizzle-orm";

export async function getPaymentStatusHandler(req: Request, res: Response) {
  const paymentOrderId = req.params.paymentOrderId;
  if (!paymentOrderId) throw new AppError(400, "Missing payment order id!");

  const resp = await Database.queryDb(db => {
    return db.select().from(paymentOrdersTable).where(eq(paymentOrdersTable.id, paymentOrderId));
  });

  res.status(200).json({
    status: "success",
    data: resp
  })
}