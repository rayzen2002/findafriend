import { FastifyInstance } from 'fastify'
import { register } from './register-controller'

export async function petRoutes(app: FastifyInstance) {
  app.post('/organization/:organizationId/pet', register)
}
