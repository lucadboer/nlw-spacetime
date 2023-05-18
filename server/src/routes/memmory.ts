import { prisma } from '@/lib/prisma'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function MemmoryRoutes(app: FastifyInstance) {
  app.get('/memmories', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'GET') {
      return
    }

    const memmories = await prisma.memmory.findMany()

    return memmories.map((memmory) => {
      return {
        id: memmory.id,
        excerpt: memmory.content.substring(0, 115).concat('...'),
        coverUrl: memmory.coverUrl,
      }
    })
  })

  app.get(
    '/memmories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      if (req.method !== 'GET') {
        return
      }

      const memmory = await prisma.memmory.findUnique({
        where: {
          id,
        },
      })
    },
  )

  app.post('/memmories', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'POST') {
      return null
    }

    await prisma.memmory.create({
      data,
    })
  })

  app.put(
    '/memmories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      if (req.method !== 'PUT') {
        return null
      }

      await prisma.memmory.update({
        where: {
          id,
        },
        data,
      })
    },
  )

  app.delete(
    '/memmories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      if (req.method !== 'DELETE') {
        return null
      }
      await prisma.memmory.delete({
        where: {
          id,
        },
      })
    },
  )
}
