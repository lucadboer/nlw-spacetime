import Image from 'next/image'
import logo from '../assets/logo.svg'

export function Hero() {
  return (
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
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <a className="inline-block cursor-pointer rounded-full bg-green-500 px-5 py-3 font-alt text-sm font-bold leading-none text-black transition hover:bg-green-400">
        CADASTRAR LEMBRANÇA
      </a>
    </div>
  )
}
