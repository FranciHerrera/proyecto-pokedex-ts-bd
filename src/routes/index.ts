import express from 'express'
import SpeciesRouter from './species.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/species', SpeciesRouter)
}

export default routerApi
