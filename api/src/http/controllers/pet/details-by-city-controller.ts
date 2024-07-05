import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-pet-repository'
import { GetDetailsOfPetByCityService } from '../../../services/get-details-of-pet-by-city'

export async function detailsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const detailsByCityParamsSchema = z.object({
    city: z.coerce.string(),
  })
  const { city } = detailsByCityParamsSchema.parse(request.params)

  const prismaPetRepository = new PrismaPetRepository()
  try {
    const getDetailsOfPetByCityService = new GetDetailsOfPetByCityService(
      prismaPetRepository,
    )
    const pets = await getDetailsOfPetByCityService.getDetailsOfPetByCity(city)

    return reply.status(200).send({ pets })
  } catch (err) {
    return reply.status(404).send(err)
  }
}
