'use client'

import { Textarea } from './ui/textarea'
import { Message, useChat } from 'ai/react'
import { Button } from './ui/button'

export function MessagesArea({ messages }: { messages: Message[] }) {
  return (
    <div className="mx-auto flex min-h-[300px] w-full max-w-3xl flex-col bg-blue-300 p-2">
      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
    </div>
  )
}

type IChatAreaProps = { height?: string }
export function ChatArea({ height = '100vh' }: IChatAreaProps) {
  const { messages, input, setInput, error, isLoading, handleSubmit } =
    useChat()

  return (
    <div
      className="flex w-full flex-col justify-between p-2"
      style={{ height }}
    >
      <MessagesArea messages={messages} />
      <div className="mx-auto flex w-full max-w-3xl flex-col p-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isLoading}
            className="bg-slate-100" // Add custom class here
            name="prompt"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </div>
        </form>

        {error && (
          <div className="text-red-500">
            {JSON.stringify(error.message)} {error.name} {error.stack}
          </div>
        )}
      </div>
    </div>
  )
}
