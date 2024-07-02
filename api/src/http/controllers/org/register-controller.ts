import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterOrganizationService } from '../../../services/register-org-service'
import { PrismaOrganizationRepository } from '../../../repositories/prisma-organization-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    email: z.string().email(),
    cep: z.string(),
    city: z.string(),
    street: z.string(),
    number: z.coerce.number(),
    neighborhood: z.string(),
    state: z.string(),
  })
  const {
    name,
    whatsapp,
    password,
    email,
    cep,
    city,
    street,
    number,
    neighborhood,
    state,
  } = registerBodySchema.parse(request.body)
  const prismaOrganizationRepository = new PrismaOrganizationRepository()
  const registerOrganizationService = new RegisterOrganizationService(
    prismaOrganizationRepository,
  )
  try {
    await registerOrganizationService.execute({
      name,
      whatsapp,
      password,
      email,
      cep,
      city,
      street,
      number,
      neighborhood,
      state,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  reply.status(201).send()
}
