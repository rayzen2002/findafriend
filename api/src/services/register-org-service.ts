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
export class RegisterOrganizationService {
  constructor(private organizationRepository: any) {}

  async execute({
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
    await this.organizationRepository.create({
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
  }
}
