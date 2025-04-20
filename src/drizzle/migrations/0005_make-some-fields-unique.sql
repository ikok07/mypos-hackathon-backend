ALTER TABLE "loyalty_cards" ADD CONSTRAINT "loyalty_cards_profile_id_unique" UNIQUE("profile_id");--> statement-breakpoint
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_type_unique" UNIQUE("type");--> statement-breakpoint
ALTER TABLE "profile_balances" ADD CONSTRAINT "profile_balances_profile_id_unique" UNIQUE("profile_id");