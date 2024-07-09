import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { authenticate } from './authenticate'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organization/create', register)
  app.post('/organization/session', authenticate)
}
