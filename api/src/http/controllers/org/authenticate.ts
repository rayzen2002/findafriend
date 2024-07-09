import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrganizationRepository } from '../../../repositories/prisma-organization-repository'
import { AuthenticateService } from '../../../services/authenticate'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(request.body)

  const orgRepository = new PrismaOrganizationRepository()
  const authenticateService = new AuthenticateService(orgRepository)
  const { organization } = await authenticateService.execute({
    email,
    password,
  })
  const token = await reply.jwtSign(
    {
      role: 'admin',
    },
    {
      sign: {
        sub: organization.id,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    {
      role: 'admin',
    },
    {
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    },
  )
  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
