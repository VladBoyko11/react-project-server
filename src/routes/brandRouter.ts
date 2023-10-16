import express from 'express'
const brandRouter = express.Router()
import brandController from '../controllers/brandController'

brandRouter.post('/', brandController.create)
brandRouter.get('/', brandController.getAll)
brandRouter.get('/:id', brandController.getOne)

export default brandRouter

