import express from 'express'
import { Species } from '../types/species.type'
import SpeciesService from '../services/species.service'

const router = express.Router()
const service = new SpeciesService()

router.post('/', async (req, res) => {
  const species: Species = req.body
  const newSpecies = await service.create(species)
  res.status(201).json(newSpecies)
})

router.get('/', async (req, res, next) => {
  try {
    if (req.query.name) {
      const species = await service.findByName(req.query.name as string)
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

export default router
