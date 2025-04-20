ALTER TABLE "customer_discounts" DROP CONSTRAINT "customer_discounts_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "customer_visits" DROP CONSTRAINT "customer_visits_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "loyalty_cards" DROP CONSTRAINT "loyalty_cards_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_balances" DROP CONSTRAINT "profile_balances_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "customer_discounts" ADD CONSTRAINT "customer_discounts_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "customer_visits" ADD CONSTRAINT "customer_visits_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "loyalty_cards" ADD CONSTRAINT "loyalty_cards_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "profile_balances" ADD CONSTRAINT "profile_balances_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;