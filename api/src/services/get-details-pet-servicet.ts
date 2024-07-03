import { z } from 'zod'
import { PrismaPetRepository } from '../repositories/prisma-pet-repository'

export class GetDetailsOfPetService {
  constructor(private prismaPetRepository: PrismaPetRepository) {}
  public params = z.string().uuid()

  async getDetailsOfPet(id: z.infer<typeof this.params>) {
    const petToShow = await this.prismaPetRepository.getPetDetails(id)
    return petToShow
  }
}
