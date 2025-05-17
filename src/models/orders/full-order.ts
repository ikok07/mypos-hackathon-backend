import { z } from "zod";
import { ordersSchema } from "../../drizzle/schema/orders";
import { orderProductsSchema } from "../../drizzle/schema/order_products";
import { receiptsSchema } from "../../drizzle/schema/receipts";

export const fullOrderSchema = ordersSchema.and(z.object({
  products: z.array(orderProductsSchema),
  receipts: z.array(receiptsSchema)
}));

export type FullOrder = z.infer<typeof fullOrderSchema>;