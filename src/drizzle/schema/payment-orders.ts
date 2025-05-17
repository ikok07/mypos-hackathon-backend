import { pgTable, text, unique } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { profilesTable } from "./profiles";

export const paymentOrdersTable = pgTable("payment-orders", {
  id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
  profile_id: text("profile_id").notNull().references(() => profilesTable.id).unique()
});

export const paymentOrderSchema = createSelectSchema(paymentOrdersTable);
export type PaymentOrder = z.infer<typeof paymentOrderSchema>;

export const paymentOrderInsertSchema = createInsertSchema(paymentOrdersTable);
export type PaymentOrderInsert = z.infer<typeof paymentOrderInsertSchema>;