import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-pet-repository'
import { RegisterPetService } from '../../../services/register-pet-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    race: z.string(),
    age: z.coerce.number(),
    type: z.string(),
  })
  const registerBodyParams = z.object({
    organizationId: z.string().uuid(),
  })
  const { name, race, age, type } = registerBodySchema.parse(request.body)
  const { organizationId } = registerBodyParams.parse(request.params)

  const prismaPetRepository = new PrismaPetRepository()
  const registerPetService = new RegisterPetService(prismaPetRepository)
  try {
    await registerPetService.execute({ name, race, age, type, organizationId })
  } catch (error) {
    return reply.status(400).send({ message: 'Internal Error' })
  }

  return reply.status(201).send()
}
