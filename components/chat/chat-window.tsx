'use client'

import { SendHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { useChat } from 'ai/react'
import MarkdownRenderer from './markdown'

export default function ChatWindow({
  height = 'calc(100vh - 3rem)',
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
      <ScrollArea className="border-10 mb-4 flex-grow border border-red-600 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block rounded-lg p-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-orange-500 text-muted'
              }`}
            >
              {message.role === 'user' ? (
                <p className="p-2">{message.content}</p>
              ) : (
                <MarkdownRenderer content={message.content} />
              )}
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
