import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  vector,
} from 'drizzle-orm/pg-core'

import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod'
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

export const pokemonTable = pgTable(
  'pokemon',
  {
    id: integer().generatedAlwaysAsIdentity(),
    pId: integer().unique().notNull(),
    name: text('name').unique().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return [
      {
        pokemonIndex: uniqueIndex('pokemonIndex').on(table.name),
        pk: primaryKey({ columns: [table.id] }),
      },
    ]
  }
)

export const SelectPokemonSchema = createSelectSchema(pokemonTable)
export type SelectPokemonType = z.infer<typeof SelectPokemonSchema>

export const InsertPokemonSchema = createInsertSchema(pokemonTable, {
  name: z
    .string()
    .min(3, {
      message: 'Pokemon name must be at least 3 characters long',
    })
    .max(255, {
      message: 'Pokemon name must be at most 255 characters long',
    }),
  pId: z.coerce.number().int().positive().min(1, {
    message: 'Pokemon ID must be a positive integer',
  }),
})

export const InsertPokemonSchemaClient = InsertPokemonSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export type InsertPokemonType = z.infer<typeof InsertPokemonSchemaClient>

export const UpdatePokemonSchema = createUpdateSchema(pokemonTable)
export type UpdatePokemonType = z.infer<typeof UpdatePokemonSchema>
