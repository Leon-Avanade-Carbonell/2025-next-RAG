import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  vector,
} from 'drizzle-orm/pg-core'

import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'

export const guidesTable = pgTable(
  'guides',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    url: text('url').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }),
  },
  (table) => [
    {
      embeddingIndex: index('embeddingIndex').using(
        'hnsw',
        table.embedding.op('vector_cosine_ops')
      ),
    },
  ]
)

export type InsertGuideType = typeof guidesTable.$inferInsert
export type SelectGuideType = typeof guidesTable.$inferSelect

export const pokemonTable = pgTable('pokemon', {
  id: serial('id').primaryKey(),
  pId: integer('p_id').unique().notNull(),
  name: text('name').unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const InsertPokemonSchema = createInsertSchema(pokemonTable, {
  name: z
    .string()
    .min(3, {
      message: 'Pokemon name must be at least 3 characters long',
    })
    .max(255, {
      message: 'Pokemon name must be at most 255 characters long',
    }),
})
// export const UpdatePokemonSchema = createUpdateSchema(pokemonTable, {
//   name: z
//     .string()
//     .min(3, {
//       message: 'Pokemon name must be at least 3 characters long',
//     })
//     .max(255, {
//       message: 'Pokemon name must be at most 255 characters long',
//     }),
// })

export type InsertPokemonType = z.infer<typeof InsertPokemonSchema>

// export type InsertPokemonType = typeof pokemonTable.$inferInsert
// export type SelectPokemonType = typeof pokemonTable.$inferSelect
