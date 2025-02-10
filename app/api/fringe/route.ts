import { openai } from '@ai-sdk/openai'
import { Message, streamText, tool } from 'ai'
import { fringeTable } from '@/drizzle/db/schema'
import { cosineDistance, desc, gt, sql } from 'drizzle-orm'
import { generateEmbedding } from '@/lib/openai'
import { db } from '@/lib/postgres'
import { z } from 'zod'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json()

  console.table(messages)

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: `Get a list of shows from the database based on the input. Respond with the show titles and why you think the user will like them `,
    // tools: [],
    messages,
    tools: {
      shows: tool({
        description: 'get the list of shows based on show details',
        execute: searchShows,
        parameters: z.object({
          search: z.string().describe('search shows for details'),
        }),
      }),
    },
    maxSteps: 5,
    // prompt: 'Provide ',
  })

  return result.toDataStreamResponse()
}

async function searchShows(args: { search: string }) {
  const { search } = args
  const embeddings = await generateEmbedding(search)
  const similarity = sql<number>`1 - (${cosineDistance(fringeTable.embedding, embeddings[0])})`

  const shows = await db
    .select()
    .from(fringeTable)
    .where(gt(similarity, 0.78))
    .orderBy(desc(similarity))
    .limit(20)

  const recommendations = shows.map((entry) => {
    const { title, description } = entry
    return { title, description }
  })

  return recommendations
}
