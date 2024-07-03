import { prisma } from '../lib/database'

export interface CreatePetArg {
  name: string
  race: string
  age: number
  type: string
  organizationId: string
}

export class PrismaPetRepository {
  async getPetDetails(id: string) {
    const petToShow = await prisma.pet.findFirst({ where: { id } })
    return petToShow
  }

  async createPet({ name, race, age, type, organizationId }: CreatePetArg) {
    try {
      await prisma.pet.create({
        data: {
          name,
          race,
          age,
          type,
          organizationId,
        },
      })
    } catch (error) {
      console.error('Not possible to create the Pet')
    }
  }
}
