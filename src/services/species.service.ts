import SpeciesM from '../models/species.model'
import { Species, SpeciesModel } from '../types/species.type'
import boom from '@hapi/boom'
import KindM from '../models/kind.model'

class SpeciesService {
  async create(species: Species) {
    try {
      const newKind = await KindM.findById(species.kind)
      if (!newKind) {
        throw boom.notFound(
          `No se encontró un tipo de pokemon con id ${species.kind}`
        )
      }
      species.kind = newKind
      const newSpecies = await SpeciesM.create(species)
      return newSpecies
    } catch (error) {
      console.log('No se guardo la especie', error)
      throw boom.badImplementation('Error al guardar la especie')
    }
  }

  async findAll() {
    try {
      const species = await SpeciesM.find().populate('kind')
      if (!species || species.length === 0) {
        throw boom.notFound('No se encontraron especies')
      }
      return species
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      throw boom.badImplementation('Error al buscar especies')
    }
  }

  async findById(id: string) {
    try {
      const species = await SpeciesM.findById(id).populate('kind')
      if (!species) {
        throw boom.notFound(`No se encontró una especie con id ${id}`)
      }
      return species
    } catch (error) {
      console.log(`Error al buscar especie por id ${id}`, error)
      throw boom.notFound(`No se encontró una especie con id ${id}`)
    }
  }

  async findByName(name: string) {
    try {
      const species = await SpeciesM.find({ name: name }).populate('kind')
      if (!species || species.length === 0) {
        throw boom.notFound(`No se encontro especie con el nombre ${name}`)
      }
      return species
    } catch (error) {
      console.log(`Error al buscar la especie por nombre ${name}`, error)
      throw boom.notFound(`No se encontro la especie con el nombre ${name}`)
    }
  }

  async findByKindId(kindId: string) {
    try {
      const species = await SpeciesM.find({
        kind: kindId
      }).populate('kind')
      if (!species || species.length === 0) {
        throw boom.notFound(
          `No se encontro la especie con el tipo id ${kindId}`
        )
      }
      return species
    } catch (error) {
      console.log(`Error al buscar la especie por el tipo id ${kindId}`, error)
      throw boom.notFound(`No se encontro la especie con el tipo id ${kindId}`)
    }
  }

  async findByKindName(kind: string) {
    try {
      const kinD = await KindM.findOne({
        kind: kind
      })
      if (!kinD) {
        throw boom.notFound(`No se encontró un tipo con el nombre ${kind}`)
      }
      const species = await SpeciesM.find({
        kind: kinD._id
      }).populate('kind')
      if (!species || species.length === 0) {
        throw boom.notFound(`No se encontro la especie con el tipo de ${kind}`)
      }
      return species
    } catch (error) {
      console.log(`Error al buscar la especie por su tipo ${kind}`, error)
      throw boom.notFound(`No se encontro la especie con el tipo ${kind}`)
    }
  }

  async findByDanger(danger: number) {
    try {
      const species = await SpeciesM.find({
        danger: danger
      }).populate('kind')
      if (!species || species.length === 0) {
        throw boom.notFound(
          `No se encontro la especie con el peligro ${danger}`
        )
      }
      return species
    } catch (error) {
      console.log(`Error al buscar la especie con el peligro ${danger}`, error)
      throw boom.notFound(`No se encontro la especie con el peligro ${danger}`)
    }
  }

  async findBySpeed(speed: number) {
    try {
      const species = await SpeciesM.find({
        speed: speed
      }).populate('kind')
      if (!species || species.length === 0) {
        throw boom.notFound(
          `No se encontro la especie con la velocidad ${speed}`
        )
      }
      return species
    } catch (error) {
      console.log(`Error al buscar la especie con velocidad ${speed}`, error)
      throw boom.notFound(`No se encontro la especie con velocidad ${speed}`)
    }
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
