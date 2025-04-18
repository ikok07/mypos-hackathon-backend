CREATE TABLE "customer_discounts" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"discount_percentage" double precision,
	"discount_start" integer,
	"discount_end" integer
);
--> statement-breakpoint
CREATE TABLE "customer_visits" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"date_enter" integer NOT NULL,
	"date_exit" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loyalty_cards" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"expiry_date" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"date" integer DEFAULT extract(epoch from now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_methods" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile_balances" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"amount_bgn" integer NOT NULL,
	"amount_credits" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "receipts" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_method_id" text NOT NULL,
	"order_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customer_discounts" ADD CONSTRAINT "customer_discounts_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_visits" ADD CONSTRAINT "customer_visits_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loyalty_cards" ADD CONSTRAINT "loyalty_cards_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_balances" ADD CONSTRAINT "profile_balances_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_payment_method_id_payment_methods_id_fk" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_methods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;