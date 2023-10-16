import { NextFunction, Request, Response } from "express";
import { prisma } from '../index'

class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body
        const type = await prisma.type.create({ data: { name: String(name) } })
        return res.json({ id: type.id, name: type.name })
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        const types = await prisma.type.findMany()
        if(types) return res.json(types)
        else return res.json('Types are not found')
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        const { name } = req.params
        const type = await prisma.type.findUnique({where: { name }})
        if (type) return res.json({ id: type.id, name: type.name })
        else return res.json('Type is not found')
    }
}

export default new TypeController()