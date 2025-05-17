import {Request, Response} from "express"
import { AppError } from "../../models/errors/app-error";
import { Database } from "../../utils/database";
import { ordersTable } from "../../drizzle/schema/orders";
import { eq } from "drizzle-orm";
import { orderProductsTable } from "../../drizzle/schema/order_products";
import { FullOrder } from "../../models/orders/full-order";
import { receiptsTable } from "../../drizzle/schema/receipts";

export async function getCustomerOrdersHandler(req: Request, res: Response) {
    const userId = req.params.userId;
    if (!userId) throw new AppError(401, "Missing user id!");

    const rawResponse = await Database.queryDb(db => {
      return db
        .select({
          order: ordersTable,
          product: orderProductsTable,
          receipt: receiptsTable
        })
        .from(ordersTable)
        .leftJoin(orderProductsTable, eq(orderProductsTable.order_id, ordersTable.id))
        .leftJoin(receiptsTable, eq(receiptsTable.order_id, ordersTable.id))
        .where(eq(ordersTable.profile_id, userId));
    });

    const orders: Map<string, FullOrder> = new Map([]);
    for (const item of rawResponse) {
      if (!item.product && !item.receipt) continue;
      if (!orders.has(item.order.id)) {
        orders.set(item.order.id, {...item.order, products: [], receipts: []})
      }

      const order = orders.get(item.order.id)!;
      if (item.product) order.products.push(item.product);
      if (item.receipt) order.receipts.push(item.receipt);
    }

    res.status(200).json({
      status: "success",
      data: Array.from(orders.values())
    });
}