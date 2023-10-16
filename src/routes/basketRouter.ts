import express from 'express'
const basketRouter = express.Router()
import basketController from '../controllers/basketController'

basketRouter.get('/:userId', basketController.getBasket )
basketRouter.get('/devices/:basketId', basketController.getBasketDevices)
basketRouter.delete('/devices/:basketId', basketController.deleteDeviceFromBasket)
basketRouter.post('/devices/:deviceId', basketController.changeCountOfProducts)
basketRouter.post('/:id', basketController.addDeviceToBasket)

export default basketRouter
