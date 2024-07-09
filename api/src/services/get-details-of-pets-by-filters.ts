import {
  PetQueryParams,
  PrismaPetRepository,
} from '../repositories/prisma-pet-repository'

export class GetDetailsOfPetsByFilters {
  constructor(private prismaPetRepository: PrismaPetRepository) {}

  async getDetailsOfPets(query: PetQueryParams, city: string) {
    const petsToShow = await this.prismaPetRepository.getPetsByFilters(
      query,
      city,
    )
    return petsToShow
  }
}
