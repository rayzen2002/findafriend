import { prisma } from '../lib/database'

interface RegisterServiceRequest {
  name: string
  whatsapp: string
  password: string
  email: string
  cep: string
  city: string
  street: string
  number: number
  neighborhood: string
  state: string
}
export async function createOrgService({
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
}: RegisterServiceRequest) {
  const orgWithSameEmail = await prisma.organization.findUnique({
    where: {
      email,
    },
  })
  if (orgWithSameEmail) {
    throw new Error('there is already a Organization with this E-mail')
  }
  const organization = await prisma.organization.create({
    data: {
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
    },
  })
  return { organization }
}
