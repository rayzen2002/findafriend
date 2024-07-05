import { prisma } from '../lib/database'

export interface CreatePetArg {
  name: string
  race: string
  age: number
  type: string
  organizationId: string
}

export class PrismaPetRepository {
  async getPetDetailsByCity(city: string) {
    const organizationsFromCity = await prisma.organization.findMany({
      where: { city },
      include: { pets: true },
    })
    console.log(organizationsFromCity)
    if (organizationsFromCity.length === 0) {
      throw new Error('There is no Organizations on this city')
    }
    const allPetsFromCity = organizationsFromCity.flatMap((org) => org.pets)

    return allPetsFromCity
  }

  async getPetDetails(id: string) {
    const petToShow = await prisma.pet.findFirstOrThrow({ where: { id } })
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
