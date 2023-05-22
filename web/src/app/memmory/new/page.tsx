import { NewMemmoryForm } from '@/components/NewMemmoryForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function New() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 transition hover:text-gray-200"
      >
        <ChevronLeft /> Voltar à timeline
      </Link>

      <NewMemmoryForm />
    </div>
  )
}
