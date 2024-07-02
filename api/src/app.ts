import { petRoutes } from './http/controllers/pet/routes'
import { organizationRoutes } from './http/controllers/org/routes'
import fastify from 'fastify'

export const app = fastify()

app.register(organizationRoutes)
app.register(petRoutes)
