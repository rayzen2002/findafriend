import { Prisma } from '@prisma/client'
import { prisma } from '../lib/database'

export class PrismaOrganizationRepository {
  async verify(data: Prisma.OrganizationCreateInput) {
    const email = data.email
    const orgWithSameEmail = await prisma.organization.findUnique({
      where: {
        email,
      },
    })
    if (orgWithSameEmail) {
      throw new Error('there is already a Organization with this E-mail')
    }
  }

  async create(data: Prisma.OrganizationCreateInput) {
    this.verify(data)
    const organization = await prisma.organization.create({
      data,
    })
    return organization
  }
}
