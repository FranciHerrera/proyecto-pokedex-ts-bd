import express from 'express'
import { Species } from '../types/species.type'
import SpeciesService from '../services/species.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'
import boom from '@hapi/boom'

const router = express.Router()
const service = new SpeciesService()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      if (req.query.name) {
        const { name } = req.query
        const species = await service.findByName(name as string)
        return res.status(200).json(species)
      }

      if (req.query.danger) {
        const { danger } = req.query
        const species = await service.findByDanger(parseInt(danger as string))
        return res.status(200).json(species)
      }

      if (req.query.speed) {
        const { speed } = req.query
        const species = await service.findBySpeed(parseInt(speed as string))
        return res.status(200).json(species)
      }

      if (req.query.id) {
        const { id } = req.query
        const species = await service.findById(id as string)
        return res.status(200).json(species)
      }

      if (req.query.kind) {
        const { kind } = req.query
        const species = await service.findByKindName(kind as string)
        return res.status(200).json(species)
      }

      if (req.query.kindId) {
        const { kindId } = req.query
        const species = await service.findByKindId(kindId as string)
        return res.status(200).json(species)
      }

      const species = await service.findAll()
      res.status(200).json(species)
    } catch (error) {
      console.error('Error:', error)
      next(boom.boomify(error))
    }
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const species: Species = req.body
      const newSpecie = await service.create(species)
      res.status(201).json(newSpecie)
    } catch (error) {
      console.error('Error:', error)
      next(boom.boomify(error))
    }
  }
)

export default router
