import SpeciesM from '../models/species.model'
import { Species, SpeciesModel } from '../types/species.type'
import boom from '@hapi/boom'

class SpeciesService {
  async create(species: Species) {
    const newSpecies = await SpeciesM.create(species).catch((error) => {
      console.log('No se guardo tu especie', error)
    })

    return newSpecies
  }

  async findAll() {
    const species = await SpeciesM.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!species) {
      throw boom.notFound('No hay especies')
    }

    return species
  }

  async findById(id: string) {
    const species = await SpeciesM.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!species) {
      throw boom.notFound('Especie no encontrada')
    }
    return species
  }

  async findByName(name: string) {
    const species = await SpeciesM.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!species) {
      throw boom.notFound('Especie no encontrada')
    }
    return species
  }

  async deleteById(id: string) {
    const species = await SpeciesM.findByIdAndDelete(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!species) {
      throw boom.notFound('Especie no encontrada')
    }
    return species
  }
}

export default SpeciesService
