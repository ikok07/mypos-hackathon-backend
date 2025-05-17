import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { paymentOrdersTable } from "../../drizzle/schema/payment-orders";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { profileBalancesTable } from "../../drizzle/schema/profile_balances";
import { MyPos } from "../../utils/mypos";

const bodyData = z.object({
  userId: z.string(),
  amount: z.coerce.number(),
  returnUrl: z.string().url(),
  paymentOrderId: z.string()
});

export async function paymentSuccessPospointsHandler(req: Request, res: Response) {
    const {data, error} = bodyData.safeParse(req.query);
    if (error) throw new AppError(400, "Missing query params!");

    const paymentOrders = await Database.queryDb(db => {
      return db.select().from(paymentOrdersTable).where(and(eq(paymentOrdersTable.id, data.paymentOrderId), eq(paymentOrdersTable.profile_id, data.userId)));
    });

    if (paymentOrders.length === 0) throw new AppError(404, `Payment order not found!`);

    const balance = await Database.queryDb(async db => {
      const result = await db.select().from(profileBalancesTable).where(eq(profileBalancesTable.profile_id, data.userId));
      if (result.length === 0) throw new AppError(404, "Balance not found!");
      return result[0];
    });

    const status = await MyPos.getPaymentStatus({
      orderId: data.paymentOrderId
    });

    if (status.PaymentStatus > 2) throw new AppError(400, `Payment status not successful! Status code: ${status.PaymentStatus}`);

    await Database.queryDb(db => {
      return db.update(profileBalancesTable).set({
        amount_credits: balance.amount_credits + data.amount
      });
    });

    await Database.queryDb(db => {
      return db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.id, data.paymentOrderId));
    });

    res.redirect(data.returnUrl);
}