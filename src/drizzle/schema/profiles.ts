import { pgTable, text } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profilesTable = pgTable("profiles", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

const profilesSchema = createSelectSchema(profilesTable);
export type Profile = z.infer<typeof profilesSchema>;

const profilesInsertSchema = createInsertSchema(profilesTable);
export type ProfileInsert = z.infer<typeof profilesInsertSchema>;
