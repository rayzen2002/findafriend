import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-pet-repository'
import { GetDetailsOfPetsByFilters } from '../../../services/get-details-of-pets-by-filters'

export async function detailsWithFilters(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const detailsParamsSchema = z.object({
    city: z.string(),
  })
  const petQuerySchema = z.object({
    type: z.string().optional(),
    name: z.string().optional(),
    age: z.number().optional(),
    race: z.string().optional(),
  })
  const { city } = detailsParamsSchema.parse(request.params)
  const query = petQuerySchema.parse(request.query)
  const prismaPetRepository = new PrismaPetRepository()

  const getDetailsOfPetService = new GetDetailsOfPetsByFilters(
    prismaPetRepository,
  )
  const pet = await getDetailsOfPetService.getDetailsOfPets(query, city)

  return reply.status(200).send({ pet })
}
