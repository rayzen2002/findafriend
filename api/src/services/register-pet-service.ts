import {
  CreatePetArg,
  PrismaPetRepository,
} from '../repositories/prisma-pet-repository'

export class RegisterPetService {
  constructor(private petRepository: PrismaPetRepository) {}

  async execute({ name, race, age, type, organizationId }: CreatePetArg) {
    await this.petRepository.createPet({
      name,
      race,
      age,
      type,
      organizationId,
    })
  }
}
