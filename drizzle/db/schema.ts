import { index, pgTable, serial, text, vector } from 'drizzle-orm/pg-core';
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

