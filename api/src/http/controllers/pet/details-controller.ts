import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-pet-repository'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamsSchema = z.object({
    petId: z.coerce.string().uuid(),
  })
  const { petId } = detailsParamsSchema.parse(request.params)

  // const pet = prisma.pet.findUnique({
  //   where: {
  //     id,
  //   },
  // })
  const prismaPetRepository = new PrismaPetRepository()
  const pet = await prismaPetRepository.getPetDetails(petId)

  return reply.status(200).send({ pet })
}
