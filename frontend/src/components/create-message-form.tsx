import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { createMessage } from '@/http/create-message'

export function CreateMessageForm() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if (!message || !roomId) {
      return
    }

    try {
      await createMessage({ message, roomId })
    } catch {
      toast.error('Falha ao enviar pergunta, tente novamente')
    }
  }

  return (
    <form
      action={createMessageAction}
      className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
    >
      <input
        type="text"
        name="message"
        placeholder="Qual a sua pergunta?"
        autoComplete="off"
        required
        className="mx-2 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
      />

      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-lg bg-orange-400 px-3 py-1.5 text-sm font-medium text-orange-950 transition-colors hover:bg-orange-500"
      >
        Criar pergunta
      </button>
    </form>
  )
}
