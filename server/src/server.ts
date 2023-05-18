import fastify from 'fastify'
import { MemmoryRoutes } from './routes/memmory'

const app = fastify()

app.register(MemmoryRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running 🚀')
  })
