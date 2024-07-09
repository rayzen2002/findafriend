import { petRoutes } from './http/controllers/pet/routes'
import { organizationRoutes } from './http/controllers/org/routes'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(organizationRoutes)
app.register(petRoutes)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
