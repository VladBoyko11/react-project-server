import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index'
import errorHandler from './middleware/ErrorHandlingMiddleware'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const PORT = 5000

const app = express()
export const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
// app.use(errorHandler)

dotenv.config()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

module.exports = app