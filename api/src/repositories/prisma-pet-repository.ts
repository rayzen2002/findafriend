import { z } from 'zod'
import { prisma } from '../lib/database'

export interface CreatePetArg {
  name: string
  race: string
  age: number
  type: string
  organizationId: string
}
export interface PetQueryParams {
  name?: string
  race?: string
  age?: number
  type?: string
}

export class PrismaPetRepository {
  async adoptPet(petId: string) {
    const pet = await prisma.pet.findFirst({
      where: { id: petId },
      include: {
        Organization: true,
      },
    })
    return pet?.Organization.whatsapp
  }

  async findPetCity(petId: string) {
    const pet = await prisma.pet.findFirst({
      where: { id: petId },
      include: {
        Organization: true,
      },
    })

    return pet?.Organization.city
  }

  async getPetDetailsByCity(city: string) {
    const organizationsFromCity = await prisma.organization.findMany({
      where: { city },
      include: { pets: true },
    })

    if (organizationsFromCity.length === 0) {
      throw new Error('There is no Organizations on this city')
    }
    const allPetsFromCity = organizationsFromCity.flatMap((org) => org.pets)

    return allPetsFromCity
  }

  async getPetsByFilters(query: PetQueryParams, city: string) {
    const petsWithFilters = await prisma.pet.findMany({
      where: {
        name: query.name,
        type: query.type,
        age: query.age,
        race: query.race,
        Organization: { city },
      },
    })
    return petsWithFilters
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
