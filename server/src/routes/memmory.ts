import { prisma } from '@/lib/prisma'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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
      const memmoryParamsSchemma = z.object({
        id: z.string().uuid(),
      })

      const { id } = memmoryParamsSchemma.parse(req.params)

      if (req.method !== 'GET') {
        return
      }

      const memmory = await prisma.memmory.findUnique({
        where: {
          id,
        },
      })

      return memmory
    },
  )

  app.post('/memmories', async (req: FastifyRequest, reply: FastifyReply) => {
    const memmoryBodySchemma = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
      userId: z.string().uuid(),
    })

    const { content, coverUrl, isPublic, userId } = memmoryBodySchemma.parse(
      req.body,
    )

    if (req.method !== 'POST') {
      return null
    }

    await prisma.memmory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId,
      },
    })
  })

  app.put(
    '/memmories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const memmoryParamsSchemma = z.object({
        id: z.string().uuid(),
      })

      const memmoryBodySchemma = z.object({
        content: z.string(),
        isPublic: z.coerce.boolean().default(false),
        coverUrl: z.string(),
      })

      const { id } = memmoryParamsSchemma.parse(req.params)

      const { content, coverUrl, isPublic } = memmoryBodySchemma.parse(req.body)

      if (req.method !== 'PUT') {
        return null
      }

      await prisma.memmory.update({
        where: {
          id,
        },
        data: {
          content,
          coverUrl,
          isPublic,
        },
      })
    },
  )

  app.delete(
    '/memmories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const memmoryParamsSchemma = z.object({
        id: z.string().uuid(),
      })

      const { id } = memmoryParamsSchemma.parse(req.params)

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
