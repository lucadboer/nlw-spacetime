'use client'

/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from 'react'
import 'animate.css'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const [key, setKey] = useState<number>(0) // Adiciona um estado para a chave

  function handleSelectedFile(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <>
      <input
        onChange={handleSelectedFile}
        type="file"
        name="coverUrl"
        id="media"
        className="invisible h-0 w-0"
      />

      {preview && (
        <img
          key={key}
          src={preview}
          alt="Preview da foto selecionada"
          className="animate__animated animate__fadeInDown aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
