CREATE TABLE "payment-orders" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payment-orders" ADD CONSTRAINT "payment-orders_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;