import fastify from 'fastify'
import cors from '@fastify/cors'
import { MemmoryRoutes } from './routes/memmory'

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(MemmoryRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running 🚀')
  })
