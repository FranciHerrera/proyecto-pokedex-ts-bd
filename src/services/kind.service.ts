import KindM from '../models/kind.model'
import { Kind, KindModel } from '../types/kind.type'
import boom from '@hapi/boom'

class KindService {
  async create(kind: Kind) {
    try {
      const newKind = await KindM.create(kind)
      return newKind
    } catch (error) {
      console.log('No se guardo el tipo de especie', error)
      throw boom.badImplementation('Error al guardar el tipo de especie')
    }
  }

  async findAll() {
    try {
      const kinds = await KindM.find()
      if (!kinds || kinds.length === 0) {
        throw boom.notFound('No se encontraron los tipos de especie')
      }
      return kinds
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error)
      throw boom.badImplementation('Error al buscar los tipos de especie')
    }
  }

  async findById(id: string) {
    try {
      const kinds = await KindM.findById(id)
      if (!kinds) {
        throw boom.notFound(`No se encontró un tipo de especie con id ${id}`)
      }
      return kinds
    } catch (error) {
      console.log(`Error al buscar el tipo de especie por id ${id}`, error)
      throw boom.notFound(`No se encontró un tipo de especie con id ${id}`)
    }
  }

  async findByKind(kind: string) {
    try {
      const kinds = await KindM.find({
        kind: kind
      })
      if (!kinds || kinds.length === 0) {
        throw boom.notFound(`No se encontro el tipo de especie ${kind}`)
      }
      return kinds
    } catch (error) {
      console.log(`Error al buscar la especie por su tipo ${kind}`, error)
      throw boom.notFound(`No se encontro el tipo de especie ${kind}`)
    }
  }
}

export default KindService
