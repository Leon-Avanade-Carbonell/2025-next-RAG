ALTER TABLE "pokemon" RENAME COLUMN "p_id" TO "pId";--> statement-breakpoint
ALTER TABLE "pokemon" DROP CONSTRAINT "pokemon_p_id_unique";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'pokemon'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "pokemon" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "pokemon" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "pokemon" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "pokemon_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_pId_unique" UNIQUE("pId");