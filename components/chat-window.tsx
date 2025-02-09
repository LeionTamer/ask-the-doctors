'use client'

import { SendHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { useChat } from 'ai/react'

export default function ChatWindow({
  height = 'calc(100vh - 6rem)',
}: {
  height?: string
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col p-4" style={{ height }}>
      <ScrollArea className="mb-4 flex-grow rounded-lg border p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block rounded-lg bg-gray-200 p-3 text-gray-800">
              AI is typing...
            </div>
          </div>
        )}
      </ScrollArea>
      <form onSubmit={onSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}
