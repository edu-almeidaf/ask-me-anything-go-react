interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({
  id,
  text,
  amountOfReactions,
  answered,
}: MessageProps) {
  return (
    <li data-answered={answered} className="">
      {text}
    </li>
  )
}
