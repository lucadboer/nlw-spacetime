import Image from 'next/image'

import userPhoto from '../assets/userPhoto.svg'
import logo from '../assets/logo.svg'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/stars.svg)] bg-cover px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 blur-full"></div>
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

        <div className="flex items-center gap-3">
          <Image
            src={userPhoto}
            width={40}
            height={40}
            quality={1}
            alt="Foto de perfil do usuário"
          />
          <p className="max-w-[160px]">
            <a className="underline transition hover:text-gray-50" href="">
              Crie sua conta
            </a>{' '}
            e salve suas memórias!
          </p>
        </div>

        <div className="space-y-5">
          <Image
            src={logo}
            width={160}
            height={48}
            alt="Logo do NLW Space Time"
            quality={1}
          />
          <div>
            <h1 className="text-5xl font-bold text-gray-50">
              Sua cápsula do tempo
            </h1>
            <p className="max-w-[420px] text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>
          <a className="inline-block cursor-pointer rounded-full bg-green-500 px-5 py-3 font-alt text-sm font-bold leading-none text-black transition hover:bg-green-400">
            CADASTRAR LEMBRANÇA
          </a>
        </div>

        <p className="text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da{' '}
          <a
            href="https://rocketseat.com.br"
            target="_blank"
            rel="noreferrer"
            className="text-purple-500 transition hover:text-purple-400"
          >
            Rocketseat
          </a>
        </p>
      </section>
      <section className="flex flex-col bg-[url(../assets/stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a className="underline transition hover:text-gray-50" href="">
              criar agora!
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
