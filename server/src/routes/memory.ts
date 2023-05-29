import { prisma } from '@/lib/prisma'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function MemoryRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    await req.jwtVerify()
  })

  app.get('/memories', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'GET') {
      return
    }

    const memories = await prisma.memory.findMany({
      where: {
        userId: req.user.sub,
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        excerpt: memory.content.substring(0, 230).concat('...'),
        coverUrl: memory.coverUrl,
      }
    })
  })

  app.get('/memories/:id', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'GET') {
      return
    }
    const memoryParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = memoryParamsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId === req.user.sub) {
      return reply.status(401).send()
    }
    return memory
  })

  app.post('/memories', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'POST') {
      return null
    }
    const memoryBodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    console.log(req.body)

    const { content, coverUrl, isPublic } = memoryBodySchema.parse(req.body)

    await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: req.user.sub,
      },
    })
  })

  app.put('/memories/:id', async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.method !== 'PUT') {
      return null
    }

    const memoryParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const memoryBodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    const { id } = memoryParamsSchema.parse(req.params)

    const { content, coverUrl, isPublic } = memoryBodySchema.parse(req.body)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== req.user.sub) {
      return reply.status(401).send()
    }

    const updatedmemory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return updatedmemory
  })

  app.delete(
    '/memories/:id',
    async (req: FastifyRequest, reply: FastifyReply) => {
      if (req.method !== 'DELETE') {
        return null
      }
      const memoryParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = memoryParamsSchema.parse(req.params)

      const memory = await prisma.memory.findFirstOrThrow({
        where: {
          id,
        },
      })

      if (memory.userId !== req.user.sub) {
        return reply.status(401).send()
      }

      await prisma.memory.delete({
        where: {
          id,
        },
      })
    },
  )
}
