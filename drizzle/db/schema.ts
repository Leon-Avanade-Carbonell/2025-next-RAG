import { index, integer, pgTable, serial, text, timestamp, vector } from 'drizzle-orm/pg-core';
export const guidesTable = pgTable(
  'guides',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    url: text('url').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }),
  },
  (table) => [{
    embeddingIndex: index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
  }],
);

export type InsertGuide = typeof guidesTable.$inferInsert
export type SelectGuide = typeof guidesTable.$inferSelect

export const pokemonTable = pgTable('pokemon', {
  id: serial('id').primaryKey(),
  pId: integer('p_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export type InsertPokemon = typeof pokemonTable.$inferInsert
export type SelectPokemon = typeof pokemonTable.$inferSelect