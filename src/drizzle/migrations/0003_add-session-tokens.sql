CREATE TABLE "session_tokens" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hashed_token" text NOT NULL,
	"profile_id" text NOT NULL,
	"expiry_date" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session_tokens" ADD CONSTRAINT "session_tokens_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;