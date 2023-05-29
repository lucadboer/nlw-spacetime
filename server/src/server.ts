import fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './env'
import { AuthRoutes } from './routes/auth'
import { UploadRoutes } from './routes/upload'

import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import staticPath from '@fastify/static'
import { resolve } from 'path'
import { MemoryRoutes } from './routes/memory'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: 'spaceTime',
})

app.register(staticPath, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(multipart)

app.register(AuthRoutes)
app.register(MemoryRoutes)
app.register(UploadRoutes)

app
  .listen({
    port: env.PORT,
    // leave active for mobile
    // host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is running 🚀')
  })
