import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema/*",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: Deno.env.get("DB_URL")!,
  },
});
