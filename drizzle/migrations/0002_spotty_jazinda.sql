ALTER TABLE "pokemon" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "pokemon" ADD COLUMN "updated_at" timestamp NOT NULL;