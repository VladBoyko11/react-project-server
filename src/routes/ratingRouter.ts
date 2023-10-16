import express from 'express'
const ratingRouter = express.Router()
import ratingController from '../controllers/ratingController'

ratingRouter.get('/:deviceID', ratingController.getDeviceRating)
ratingRouter.get('/user/:userId', ratingController.getUserRatings)
ratingRouter.post('/', ratingController.addDeviceRating)

export default ratingRouter
