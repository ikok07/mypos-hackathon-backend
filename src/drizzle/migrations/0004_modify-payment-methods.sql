CREATE TYPE "public"."payment_method_type" AS ENUM('cash', 'card');--> statement-breakpoint
ALTER TABLE "payment_methods" RENAME COLUMN "label" TO "type";--> statement-breakpoint
ALTER TABLE "payment_methods" DROP CONSTRAINT "payment_methods_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "payment_methods" DROP COLUMN "profile_id";