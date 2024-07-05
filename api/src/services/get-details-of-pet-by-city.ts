import { PrismaPetRepository } from '../repositories/prisma-pet-repository'

export class GetDetailsOfPetByCityService {
  constructor(private prismaPetRepository: PrismaPetRepository) {}

  async getDetailsOfPetByCity(city: string) {
    const petsToShow = await this.prismaPetRepository.getPetDetailsByCity(city)
    return petsToShow
  }
}
