import { openai } from '@ai-sdk/openai'
import { Message, streamText } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json()

  console.table(messages)

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant',
    messages,
  })

  return result.toDataStreamResponse()
}
