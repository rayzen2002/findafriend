import { Organization } from '@prisma/client'
import { PrismaOrganizationRepository } from '../repositories/prisma-organization-repository'

interface AuthenticateServiceRequest {
  email: string
  password: string
}
interface AuthenticateServiceResponse {
  organization: Organization
}
export class AuthenticateService {
  constructor(private organizationRepository: PrismaOrganizationRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const organization = await this.organizationRepository.findByEmail(email)
    if (!organization) {
      throw new Error('Org nao existente')
    }
    if (password !== organization.password) {
      throw new Error('Senha invalida')
    }
    return { organization }
  }
}
