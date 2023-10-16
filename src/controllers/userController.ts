import ApiError from '../error/ApiError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import {prisma} from '../index'

const sercetKey = "random_secret_key123"

const generateJwt = (id: number, email: string, role: string) => {
    return jwt.sign(
        {id, email, role},
        sercetKey,
        {expiresIn: '1h'}
    )
}

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        const {email, password, role = 'ADMIN'} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await prisma.user.findUnique({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await prisma.user.create({data: {email, role, password: hashPassword}})
        const basket = await prisma.basket.create({data: {userId: user.id}})
        const token = user.id ? generateJwt(user.id, user.email, user.role) : null
        return res.json({token, email: user.email, role: user.role, password: user.password, id: user.id})
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body
        const user = await prisma.user.findUnique({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = user.id ? generateJwt(user.id, user.email, user.role) : null
        return res.json({token, email: user.email, role: user.role, password: user.password, id: user.id})
    }

    async check(req: Request, res: Response, next: NextFunction) {
        const token = generateJwt(req.body.user.id, req.body.user.email, req.body.user.role)
        console.log({token, email: req.body.user.email, role: req.body.user.role})
        return res.json({token, email: req.body.user.email, role: req.body.user.role, id: req.body.user.id})
    }
    async setNewEmail(req: Request, res: Response, next: NextFunction) {
        const {email, id} = req.body
        const user = await prisma.user.update({where: {id: id}, data: {email}})
        res.json({email: user.email})
    }
}

export default new UserController()
