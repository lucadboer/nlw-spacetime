import { Camera, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function New() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <input
        type="file"
        name="midia"
        id="midia"
        className="invisible h-0 w-0"
      />

      <Link
        href="/"
        className="flex items-center gap-1 transition hover:text-gray-200"
      >
        <ChevronLeft /> Voltar à timeline
      </Link>

      <form className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-6">
          <label
            className="flex cursor-pointer items-center gap-2 transition hover:text-gray-200"
            htmlFor="midia"
          >
            <Camera size={16} /> Anexar mídia
          </label>

          <label
            htmlFor="isPublic"
            className="flex cursor-pointer items-center gap-2 transition hover:text-gray-200"
          >
            Tornar memória pública
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              className="checked:bg h-4 w-4 rounded bg-gray-700 text-purple-500 focus:ring-0"
            />
          </label>
        </div>
        <textarea
          name="content"
          id="content"
          spellCheck={false}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          className="w-full flex-1 border-0 bg-transparent text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        />
      </form>
    </div>
  )
}
