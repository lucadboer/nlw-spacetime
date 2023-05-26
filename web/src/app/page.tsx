import { EmpityMemories } from '@/components/EmpityMemories'
import { api } from '@/libs/axios'
import { cookies } from 'next/headers'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'

dayjs.locale(ptBr)

interface Memmory {
  id: string
  name: string
  excerpt: string
  coverUrl: string
  createdAt: string
}

export default async function Home() {
  const token = cookies().get('token')?.value

  if (!token) {
    return <EmpityMemories />
  }

  const response = await api('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memmory[] = response.data

  if (!memories) {
    return <EmpityMemories />
  }

  return (
    <div className="flex flex-col justify-center p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="mb-10 space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-xs leading-relaxed text-gray-100 before:h-px before:w-4 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={memory.coverUrl}
              width={600}
              height={280}
              quality={1}
              alt=""
              className="h-[280px] w-full rounded-lg"
            />
            <p className="max-w-[592px] text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
          </div>
        )
      })}
    </div>
  )
}
