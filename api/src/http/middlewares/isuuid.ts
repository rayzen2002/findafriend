import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function isUuid(request: FastifyRequest) {
  const param = z.object({
    petId: z.string().uuid(),
  })
  const { petId } = param.parse(request.params)
  if (!petId) {
    throw new Error('Invalid PetId')
  }
}
