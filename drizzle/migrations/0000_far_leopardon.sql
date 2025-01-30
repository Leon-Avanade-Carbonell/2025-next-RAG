CREATE TABLE "guides" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"url" text NOT NULL,
	"embedding" vector(1536)
);
--> statement-breakpoint
CREATE TABLE "pokemon" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "pokemon_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pId" integer NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "pokemon_pId_unique" UNIQUE("pId"),
	CONSTRAINT "pokemon_name_unique" UNIQUE("name")
);
