import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-pet-repository'
import { GetDetailsOfPetService } from '../../../services/get-details-pet-servicet'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamsSchema = z.object({
    petId: z.coerce.string().uuid(),
  })
  const { petId } = detailsParamsSchema.parse(request.params)

  const prismaPetRepository = new PrismaPetRepository()
  const getDetailsOfPetService = new GetDetailsOfPetService(prismaPetRepository)
  const pet = await getDetailsOfPetService.getDetailsOfPet(petId)

  return reply.status(200).send({ pet })
}
