import { createOpenAI } from '@ai-sdk/openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!

export const openai = createOpenAI({ apiKey: OPENAI_API_KEY })

export const model = openai('gpt-4o')

export const embedding = openai.embedding('text-embedding-ada-002')
