import { Message } from './message'

export function Messages() {
  const messages = [
    {
      id: '1',
      text: 'lkajsd',
      amountOfReactions: 2,
      answered: false,
    },
    {
      id: '2',
      text: 'lkajsd',
      amountOfReactions: 2,
      answered: false,
    },
  ]

  return (
    <ol className="list-outside list-decimal space-y-8 px-3">
      {messages.map((message) => {
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
