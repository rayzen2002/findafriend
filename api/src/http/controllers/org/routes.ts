import { FastifyInstance } from 'fastify'
import { register } from './register-controller'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organization/create', register)
}
