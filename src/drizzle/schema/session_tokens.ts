import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const sessionTokensTable = pgTable("session_tokens", {
  id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
  hashed_token: text("hashed_token").notNull(),
  expiry_date: integer("expiry_date").notNull()
});

export const sessionTokenSchema = createSelectSchema(sessionTokensTable);
export type SessionToken = z.infer<typeof sessionTokenSchema>;

export const sessionTokenInsertSchema = createInsertSchema(sessionTokensTable);
export type SessionTokenInsert = z.infer<typeof sessionTokenInsertSchema>;