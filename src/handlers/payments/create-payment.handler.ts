import {Request, Response} from "express"
import { MyPos } from "../../utils/mypos";
import { z } from "zod";
import { cartItemSchema } from "../../models/payments/initiate-payment";
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { paymentOrdersTable } from "../../drizzle/schema/payment-orders";
import { eq } from "drizzle-orm";

export const bodySchema = z.object({
  userId: z.string(),
  currency: z.enum(["EUR", "BGN"]),
  returnUrl: z.string().url(),
  cancelUrl: z.string().url(),
  customerEmail: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  country: z.enum(["BGR", "DEU"]),
  city: z.string(),
  zipCode: z.string(),
  address: z.string(),
  cart: z.array(cartItemSchema)
});

export async function createPaymentHandler(req: Request, res: Response) {
  const {data, error} = bodySchema.safeParse({...req.query, cart: req.query.cart ? JSON.parse(req.query.cart as string) : undefined});
  if (error) throw new AppError(400, "Invalid body!");
  let paymentOrderId: string | undefined = undefined;

  // Delete previous records
  await Database.queryDb(db => {
    return db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.profile_id, data.userId));
  })

  try {
    const paymentOrder = await Database.queryDb(db => {
      return db.insert(paymentOrdersTable).values({
        profile_id: data.userId
      }).returning()
    });

    paymentOrderId = paymentOrder[0].id;

    const response = await MyPos.initiatePayment({
      Amount: data.cart.reduce((prev, curr) => prev + curr.Price * curr.Quantity, 0),
      Currency: data.currency,
      OrderID: paymentOrderId,
      URL_OK: data.returnUrl,
      URL_Cancel: data.cancelUrl,
      URL_Notify: `https://demo.mypos.eu/vmp/checkout/client/ipcNotify`,
      CardTokenRequest: 0,
      CustomerEmail: data.customerEmail,
      CustomerFirstNames: data.firstName,
      CustomerFamilyName: data.lastName,
      CustomerPhone: data?.phone,
      CustomerCountry: data.country,
      CustomerCity: data.city,
      CustomerZIPCode: data.zipCode,
      CustomerAddress: data.address,
      CartItems: data.cart.length,
      Cart: data.cart
    });

    res.send(response);
  } catch(e) {
    if (paymentOrderId) {
      await Database.queryDb(db => {
        return db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.id, paymentOrderId!));
      })
    }
    throw e;
  }
}