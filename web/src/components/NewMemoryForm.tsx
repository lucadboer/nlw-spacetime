'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/libs/axios'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreatememory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    await api.post(
      '/memories',
      {
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form onSubmit={handleCreatememory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-6">
        <label
          className="flex cursor-pointer items-center gap-2 transition hover:text-gray-200"
          htmlFor="media"
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
      <MediaPicker />

      <textarea
        name="content"
        id="content"
        spellCheck={false}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        className="w-full flex-1 border-0 bg-transparent text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />

      <button
        type="submit"
        className="cursor-pointer self-end rounded-full bg-green-500 px-6 py-4 font-alt text-lg font-bold leading-none text-black transition hover:bg-green-400"
      >
        Memorizar
      </button>
    </form>
  )
}
