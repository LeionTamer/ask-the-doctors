'use client'

import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'

export default function ChatWindow() {
  return (
    <Card className="mx-auto mt-8 w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[40rem] overflow-y-auto p-5">
        Cats
      </CardContent>
      <CardFooter>
        <form className="flex w-full flex-col gap-2">
          <div>
            <Textarea />
          </div>

          <div className="flex justify-end">
            <Button>Send</Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
