import Link from 'next/link'

export function EmpityMemmories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <Link
          href="/memmory/new"
          className="underline transition hover:text-gray-50"
        >
          criar agora!
        </Link>
      </p>
    </div>
  )
}
