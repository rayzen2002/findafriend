import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-pet-repository'
import { GetDetailsOfPetService } from '../../../services/get-details-pet-servicet'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamsSchema = z.object({
    petId: z.coerce.string().uuid(),
    city: z.string(),
  })
  const { petId, city } = detailsParamsSchema.parse(request.params)

  const prismaPetRepository = new PrismaPetRepository()
  const findPetCity = await prismaPetRepository.findPetCity(petId)
  if (city !== findPetCity) {
    return reply.status(404).send('Invalid City')
  }
  const getDetailsOfPetService = new GetDetailsOfPetService(prismaPetRepository)
  const pet = await getDetailsOfPetService.getDetailsOfPet(petId)

  return reply.status(200).send({ pet })
}
