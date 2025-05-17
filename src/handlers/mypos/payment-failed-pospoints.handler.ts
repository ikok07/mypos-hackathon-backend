import {Request, Response} from "express"
import { z } from "zod";
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { paymentOrdersTable } from "../../drizzle/schema/payment-orders";
import { and, eq } from "drizzle-orm";

const bodyData = z.object({
  userId: z.string(),
  returnUrl: z.string().url(),
  paymentOrderId: z.string()
});

export async function paymentFailedPospointsHandler(req: Request, res: Response) {
  const {data, error} = bodyData.safeParse(req.query);
  if (error) throw new AppError(400, "Missing query params!");

  const paymentOrders = await Database.queryDb(db => {
    return db.select().from(paymentOrdersTable).where(and(eq(paymentOrdersTable.id, data.paymentOrderId), eq(paymentOrdersTable.profile_id, data.userId)));
  });

  if (paymentOrders.length === 0) throw new AppError(404, `Payment order not found!`);

  await Database.queryDb(db => {
    return db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.id, data.paymentOrderId));
  })

  res.redirect(data.returnUrl);
}