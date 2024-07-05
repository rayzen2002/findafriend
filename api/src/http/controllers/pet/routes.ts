import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { details } from './details-controller'
import { detailsByCity } from './details-by-city-controller'

export async function petRoutes(app: FastifyInstance) {
  app.post('/organization/:organizationId/pet', register)
  app.get('/pets/:city/:petId', details)
  app.get('/pets/city/:city', detailsByCity)
}
