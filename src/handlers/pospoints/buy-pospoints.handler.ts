import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { paymentOrdersTable } from "../../drizzle/schema/payment-orders";
import { eq } from "drizzle-orm";
import { MyPos } from "../../utils/mypos";
import { z } from "zod";
import { CartItem } from "../../models/payments/initiate-payment";

export const bodySchema = z.object({
  userId: z.string(),
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
  amount: z.coerce.number()
});

export async function buyPospointsHandler(req: Request, res: Response) {
  const {data, error} = bodySchema.safeParse(req.query);

  if (error) throw new AppError(400, "Invalid body!");

  let paymentOrderId: string | undefined = undefined;

  // Delete previous records
  await Database.queryDb(db => {
    return db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.profile_id, data.userId));
  });

  try {
    const paymentOrder = await Database.queryDb(db => {
      return db.insert(paymentOrdersTable).values({
        profile_id: data.userId
      }).returning()
    });

    paymentOrderId = paymentOrder[0].id;

    let totalPrice = data.amount * +process.env.SINGLE_CREDIT_PRICE!;
    const discount = totalPrice > 70 ? 0.03 * totalPrice : 0;
    totalPrice -= discount;

    const cartItems: CartItem[] = [{
      Currency: "EUR",
      Article: "Pospoints",
      Quantity: data.amount,
      Price: +process.env.SINGLE_CREDIT_PRICE!
    }];

    if (discount > 0) cartItems.push({
      Currency: "EUR",
      Article: "Discount",
      Quantity: 1,
      Price: -discount
    });

    const response = await MyPos.initiatePayment({
      Amount: totalPrice,
      Currency: "EUR",
      OrderID: paymentOrderId,
      // I noticed I could get the data when handling the URL_OK route, but it was too late :). At least it works (in testing env). Check paymentSuccessPospointsHandler
      URL_OK: `${process.env.BASE_URL!}/api/v1/webhooks/mypos/payment/success/pospoints?userId=${data.userId}&returnUrl=${data.returnUrl}&amount=${data.amount}&paymentOrderId=${paymentOrderId}`,
      URL_Cancel: `${process.env.BASE_URL!}/api/v1/webhooks/mypos/payment/failed/pospoints?userId=${data.userId}&returnUrl=${data.cancelUrl}&paymentOrderId=${paymentOrderId}`,
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
      CartItems: discount > 0 ? 2 : 1,
      Cart: cartItems
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