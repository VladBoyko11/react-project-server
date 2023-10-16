import express from 'express'
const typeRouter = express.Router()
import typeController from '../controllers/typeController'

typeRouter.post('/', typeController.create)
typeRouter.get('/', typeController.getAll)
typeRouter.get('/:name', typeController.getOne)

export default typeRouter
