import ApiError from '../error/ApiError';
import { NextFunction, Request, Response } from 'express';
import {prisma} from '../index'

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        const {name} = req.body
        const brand = await prisma.brand.create({data: {name}})
        return res.json({id: brand.id, name: brand.name})
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const brands = await prisma.brand.findMany()
        if(brands.length > 0) return res.json(brands)
        else return res.json('Brands are not found')
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        const brand = await prisma.brand.findUnique({where: {id: Number(id)}})
        if(brand) return res.json({id: brand.id, name: brand.name})
        else return res.json('Brand is not found')
    }
}

export default new BrandController()
