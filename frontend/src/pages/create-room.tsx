import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import AmaLogo from '@/assets/ama-logo.svg'

export function CreateRoom() {
  const navigate = useNavigate()

  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      navigate('/room/1')
    } catch {
      toast.error('Falha ao criar a sala!')
    }
  }

  return (
    <main className="flex h-screen items-center justify-center px-4">
      <div className="flex max-h-[450px] flex-col gap-6">
        <img src={AmaLogo} alt="AMA" className="h-10" />

        <p>
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas
          mais importantes para a comunidade.
        </p>

        <form
          action={handleCreateRoom}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
        >
          <input
            type="text"
            name="theme"
            placeholder="Nome da sala"
            autoComplete="off"
            className="mx-2 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
            required
          />

          <button
            type="submit"
            className="flex items-center rounded-lg bg-orange-400 px-3 py-1.5 text-sm font-medium text-orange-950 transition-colors hover:bg-orange-500"
          >
            Criar sala
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  )
}
