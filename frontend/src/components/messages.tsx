import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useMessageWebSockets } from '@/hooks/use-messages-web-sockets'
import { getRoomMessages } from '@/http/get-room-messages'

import { Message } from './message'

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  })

  useMessageWebSockets({ roomId })

  console.log(data)

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions
  })

  return (
    <ol className="list-outside list-decimal space-y-8 px-3">
      {sortedMessages.map((message) => {
        return (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        )
      })}
    </ol>
  )
}
