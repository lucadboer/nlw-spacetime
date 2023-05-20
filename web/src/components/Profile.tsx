import Image from 'next/image'
import { getUser } from '@/utils/getUser'
import { LogOut } from 'lucide-react'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        quality={100}
        alt="Foto de perfil do usuário"
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span>{name}</span>
        <a
          href="/api/auth/logout"
          className="flex items-center gap-1 text-sm text-red-500 transition hover:text-red-400"
        >
          <LogOut size={16} /> Quero sair
        </a>
      </div>
    </div>
  )
}
