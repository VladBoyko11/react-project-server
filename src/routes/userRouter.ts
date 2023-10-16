import express from 'express'
const userRouter = express.Router()
import userController from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/auth', authMiddleware, userController.check)
userRouter.post('/newEmail', userController.setNewEmail)

export default userRouter
