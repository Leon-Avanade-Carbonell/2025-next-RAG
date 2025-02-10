'use client'

import { Textarea } from './ui/textarea'
import { Message, useChat } from 'ai/react'
import { Button } from './ui/button'
import Spinner from './spinner'

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div
      className={`mx-2 mt-2 flex p-2 border-sm border-2 ${isUser ? 'border-yellow-700 text-yellow-700 text-right' : 'border-green-700 text-green-700 text-left'}`}
    >
      {message.content.length <= 1 ? <Spinner /> : message.content}
    </div>
  )
}

export function MessagesArea({ messages }: { messages: Message[] }) {
  return (
    <div className="mx-auto flex max-h-[80vh] min-h-[300px] w-full max-w-3xl flex-col overflow-y-auto">
      {messages.map((message, mId) => (
        <MessageBubble key={mId} message={message} />
      ))}
    </div>
  )
}

type IChatAreaProps = { height?: string }
export function ChatArea({ height = '100vh' }: IChatAreaProps) {
  const { messages, input, setInput, error, isLoading, handleSubmit } = useChat(
    { api: '/api/fringe' }
  )

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
