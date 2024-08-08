import { Share2 } from 'lucide-react'
import { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import AmaLogo from '@/assets/ama-logo.svg'
import { CreateMessageForm } from '@/components/create-message-form'
import { Messages } from '@/components/messages'

export function Room() {
  const { roomId } = useParams()

  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-5 px-4 py-20">
      <div className="flex items-center gap-3 px-3">
        <img src={AmaLogo} alt="AMA" className="h-5" />

        <span className="truncate text-sm text-zinc-500">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button className="ml-auto flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-700">
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <CreateMessageForm />

      <Suspense fallback={<p>Carregando...</p>}>
        <Messages />
      </Suspense>
    </div>
  )
}
