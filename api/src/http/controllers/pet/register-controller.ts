import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/database'
import { z } from 'zod'

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
  await prisma.pet.create({
    data: {
      name,
      race,
      age,
      type,
      organizationId,
    },
  })
  return reply.status(201).send()
}
