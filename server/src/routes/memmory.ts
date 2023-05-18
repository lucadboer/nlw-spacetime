import { prisma } from '@/lib/prisma'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function MemmoryRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    await req.jwtVerify()
  })

  app.get('/memmories', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'GET') {
      return
    }

    const memmories = await prisma.memmory.findMany({
      where: {
        userId: req.user.sub,
      },
    })

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
      const memmoryParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = memmoryParamsSchema.parse(req.params)

      const memmory = await prisma.memmory.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (!memmory.isPublic && memmory.userId === req.user.sub) {
        return reply.status(401).send()
      }
      return memmory
    },
  )

  app.post('/memmories', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'POST') {
      return null
    }
    const memmoryBodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    const { content, coverUrl, isPublic } = memmoryBodySchema.parse(req.body)

    await prisma.memmory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: req.user.sub,
      },
    })
  })

  app.put(
    '/memmories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      if (req.method !== 'PUT') {
        return null
      }

      const memmoryParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const memmoryBodySchema = z.object({
        content: z.string(),
        isPublic: z.coerce.boolean().default(false),
        coverUrl: z.string(),
      })

      const { id } = memmoryParamsSchema.parse(req.params)

      const { content, coverUrl, isPublic } = memmoryBodySchema.parse(req.body)

      const memmory = await prisma.memmory.findFirstOrThrow({
        where: {
          id,
        },
      })

      if (memmory.userId !== req.user.sub) {
        return reply.status(401).send()
      }

      const updatedMemmory = await prisma.memmory.update({
        where: {
          id,
        },
        data: {
          content,
          coverUrl,
          isPublic,
        },
      })

      return updatedMemmory
    },
  )

  app.delete(
    '/memmories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      if (req.method !== 'DELETE') {
        return null
      }
      const memmoryParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = memmoryParamsSchema.parse(req.params)

      const memmory = await prisma.memmory.findFirstOrThrow({
        where: {
          id,
        },
      })

      if (memmory.userId !== req.user.sub) {
        return reply.status(401).send()
      }

      await prisma.memmory.delete({
        where: {
          id,
        },
      })
    },
  )
}
