import { createOpenAI } from '@ai-sdk/openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!

export const openai = createOpenAI({ apiKey: OPENAI_API_KEY })

export const model = openai('gpt-4o')

export const embedding = openai.embedding('text-embedding-ada-002')

export async function generateEmbedding(value: string) {
  const input = value.replaceAll('\n', ' ')
  const { embeddings } = await openai
    .embedding('text-embedding-ada-002')
    .doEmbed({ values: [input] })
  return embeddings
}
