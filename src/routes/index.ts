import express from 'express'
import SpeciesRouter from './species.route'
import UserRouter from './user.route'
import KindRouter from './kind.route'
import AuthRouter from './auth.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/species', SpeciesRouter)
  router.use('/users', UserRouter)
  router.use('/auth', AuthRouter)
  router.use('/kind', KindRouter)
}

export default routerApi
