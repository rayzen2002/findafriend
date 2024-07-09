import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-pet-repository'

export async function petAdoption(req: FastifyRequest, reply: FastifyReply) {
  const petParamsSchema = z.object({
    petId: z.string().uuid(),
  })
  const { petId } = petParamsSchema.parse(req.body)

  const petPrismaRepository = new PrismaPetRepository()
  const xd = await petPrismaRepository.adoptPet(petId)
  reply.status(200).send({ Message: `Contact us on our Whatsapp ${xd}` })
}
