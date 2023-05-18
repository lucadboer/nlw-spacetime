import fastify from 'fastify'
import cors from '@fastify/cors'
import { MemmoryRoutes } from './routes/memmory'
import { env } from './env'
import { AuthRoutes } from './routes/auth'
import fastifyJwt from '@fastify/jwt'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: 'spaceTime',
})

app.register(AuthRoutes)
app.register(MemmoryRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running 🚀')
  })
