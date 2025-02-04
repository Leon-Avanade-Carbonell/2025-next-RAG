CREATE TABLE "fringe" (
	"id" serial PRIMARY KEY NOT NULL,
	"showId" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"embedding" vector(1536),
	CONSTRAINT "fringe_showId_unique" UNIQUE("showId")
);
