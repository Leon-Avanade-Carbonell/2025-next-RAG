'use server'

import { fringeTable } from '@/drizzle/db/schema'
import { cosineDistance, gt, sql } from 'drizzle-orm'
import { generateEmbedding } from '@/lib/openai'
import { db } from '@/lib/postgres'

export async function getAllShowsAction(search: string) {
  const embeddings = await generateEmbedding(search)
  const similarity = sql<number>`1 - (${cosineDistance(fringeTable.embedding, embeddings[0])})`

  const shows = await db
    .select()
    .from(fringeTable)
    .where(gt(similarity, 0.8))
    .limit(20)

  return shows
}
