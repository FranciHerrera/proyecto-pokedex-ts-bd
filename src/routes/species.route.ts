import express from 'express'
import { Species } from '../types/species.type'
import SpeciesService from '../services/species.service'

const router = express.Router()
const service = new SpeciesService()

router.post('/', async (req, res) => {
  const species: Species = req.body
  const newSpecies = await service.create(species)
  res.status(201).json({
    Especie: 'Agregada'
  })
})

router.get('/', async (req, res, next) => {
  try {
    if (req.query.name) {
      const species = await service.findByName(req.query.name as string)
      res.status(200).json(species)
    } else if (req.query.kind) {
      const species = await service.findByKind(req.query.kind as string)
      res.status(200).json(species)
    } else if (req.query.danger) {
      const species = await service.findByDanger(
        parseInt(req.query.danger as string)
      )
      res.status(200).json(species)
    } else if (req.query.speed) {
      const species = await service.findBySpeed(
        parseInt(req.query.speed as string)
      )
      res.status(200).json(species)
    } else {
      const categories = await service.findAll()
      res.status(200).json(categories)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const species = await service.findById(req.params.id)
    res.status(200).json(species)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const species = await service.deleteById(req.params.id)
    res.status(200).json({
      Especie: 'borrada'
    })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const species = await service.findById(req.query.name as string)
    res.status(200).json(species)
  } catch (error) {
    next(error)
  }
})

export default router
