import express from 'express'
const router = express.Router()

import deviceRouter from './deviceRouter'
import userRouter from './userRouter'
import brandRouter from './brandRouter'
import typeRouter from './typeRouter'
import basketRouter from './basketRouter'
import ratingRouter from './ratingRouter'

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)

export default router
