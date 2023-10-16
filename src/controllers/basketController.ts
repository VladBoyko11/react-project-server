import ApiError from '../error/ApiError';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../index'

class BasketController {
    async getBasket(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params
        const basket = await prisma.basket.findUnique({ where: { userId: Number(userId) } })
        if (basket) return res.json({ id: basket.id })
        else return res.json('basket is not found')
    }
    async getBasketDevices(req: Request, res: Response, next: NextFunction) {
        const { basketId } = req.params
        const devices = await prisma.basketDevice.findMany({ where: { basketId: Number(basketId) } })
        if (devices.length > 0) return res.json(devices)
        else return res.json('devices are not found in basket')
    }
    async deleteDeviceFromBasket(req: Request, res: Response, next: NextFunction) {
        const { deviceId } = req.query
        const { basketId } = req.params
        const device = await prisma.basketDevice.findUnique({ where: { deviceId_basketId: {basketId: Number(basketId), deviceId: Number(deviceId) } } })
            if (device) {
                await prisma.basketDevice.delete({ where: { deviceId_basketId: { basketId: Number(basketId), deviceId: Number(deviceId) }} })
                return res.json(device)
            } else return res.json('device is not found in basket')
    }
    async addDeviceToBasket(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const basketId = id
        const { deviceId } = req.query
        const device = await prisma.basketDevice.findUnique({ where: {deviceId_basketId: { basketId: Number(basketId), deviceId: Number(deviceId) }} })
        if (device) {
            return next(ApiError.badRequest('Item has added to basket already'))
        } else {
            const device = await prisma.basketDevice.create({
                data: {
                    basketId: Number(id),
                    deviceId: Number(deviceId)
                }
            })
            return res.json({ basketId: device.basketId, deviceId: device.deviceId })
        }
    }
    async changeCountOfProducts(req: Request, res: Response, next: NextFunction) {
        const {countOfProducts, basketId} = req.body
        const {deviceId} = req.params

        const basketDevice = await prisma.basketDevice.update({where: {deviceId_basketId: {
            deviceId: Number(deviceId),
            basketId: Number(basketId)
        }}, data: {
            countOfProducts: Number(countOfProducts)
        }})
        return res.json(basketDevice)
    }
}

export default new BasketController()
