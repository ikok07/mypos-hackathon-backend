import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { profilesTable } from "./profiles.ts";

export const paymentMethodType = pgEnum("payment_method_type", [
    "cash",
    "card",
]);

export const paymentMethodsTable = pgTable("payment_methods", {
    id: text("id")
        .notNull()
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    type: paymentMethodType().notNull(),
});

export const paymentMethodsSchema = createSelectSchema(paymentMethodsTable);
export type PaymentMethods = z.infer<typeof paymentMethodsSchema>;

export const paymentMethodsInsertSchema =
    createInsertSchema(paymentMethodsTable);
export type PaymentMethodsInsert = z.infer<typeof paymentMethodsInsertSchema>;
