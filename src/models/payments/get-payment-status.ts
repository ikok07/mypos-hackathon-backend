import { z } from "zod";

export const getPaymentStatusOptionsSchema = z.object({
  orderId: z.string()
});

export const getPaymentStatusResponseSchema = z.object({
  OrderID: z.string(),
  PaymentStatus: z.number().min(1).max(4),
});

export type GetPaymentStatusOptions = z.infer<typeof getPaymentStatusOptionsSchema>;
export type GetPaymentStatusResponse = z.infer<typeof getPaymentStatusResponseSchema>;