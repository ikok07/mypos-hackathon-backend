ALTER TABLE "session_tokens" DROP CONSTRAINT "session_tokens_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "session_tokens" DROP COLUMN "profile_id";