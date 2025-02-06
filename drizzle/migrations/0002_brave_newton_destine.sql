ALTER TABLE "fringe" RENAME COLUMN "showId" TO "url";--> statement-breakpoint
ALTER TABLE "fringe" DROP CONSTRAINT "fringe_showId_unique";--> statement-breakpoint
ALTER TABLE "fringe" ADD COLUMN "genre" text NOT NULL;