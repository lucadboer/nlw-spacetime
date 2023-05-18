import Image from 'next/image'
import userPhoto from '../assets/userPhoto.svg'

export function SignIn() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={userPhoto}
        width={40}
        height={40}
        quality={1}
        alt="Foto de perfil do usuário"
      />
      <p className="max-w-[160px]">
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
          className="underline transition hover:text-gray-50"
        >
          Crie sua conta
        </a>{' '}
        e salve suas memórias!
      </p>
    </div>
  )
}
