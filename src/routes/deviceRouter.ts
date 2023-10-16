import express from 'express'
const deviceRouter = express.Router()
import deviceController from '../controllers/deviceController'

deviceRouter.post('/', deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/deviceIds', deviceController.getAllByIds)
deviceRouter.get('/totalCount', deviceController.getTotalCount)
deviceRouter.get('/:id', deviceController.getOne)

export default deviceRouter
