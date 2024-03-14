import express from 'express'
import { Kind } from '../types/kind.type'
import KindService from '../services/kind.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'
import boom from '@hapi/boom'

const router = express.Router()
const service = new KindService()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      if (req.query.kind) {
        const { kind } = req.query
        const kinds = await service.findByKind(kind as string)
        return res.status(200).json(kinds)
      }
      if (req.query.id) {
        const { id } = req.query
        const kinds = await service.findById(id as string)
        return res.status(200).json(kinds)
      }
      const kinds = await service.findAll()
      res.status(200).json(kinds)
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
      const kind: Kind = req.body
      const newKind = await service.create(kind)
      res.status(201).json(newKind)
    } catch (error) {
      console.error('Error:', error)
      next(boom.boomify(error))
    }
  }
)

export default router
