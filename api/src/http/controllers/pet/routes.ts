import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { details } from './details-controller'

export async function petRoutes(app: FastifyInstance) {
  app.post('/organization/:organizationId/pet', register)
  app.get('/pets/:petId', details)
}
