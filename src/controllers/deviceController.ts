import { NextFunction, Request, Response } from "express";

import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { prisma } from '../index'
import { UploadedFile } from "express-fileupload";
import ApiError from "../error/ApiError";

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, brandId, typeId, title = '', description = '', rating = 0 } = req.body;
      const fileName = uuidv4() + ".jpg";
      // return res.json(`${name}, ${price}, ${brandId}, ${typeId}, ${title}, ${description}, ${fileName}`)
      // return res.json(req.files)
      const device = await prisma.device.create({data: {
        name,
        price: Number(price),
        brandId: Number(brandId),
        typeId: Number(typeId),
        img: fileName,
        title,
        description,
        rating: Number(rating)
      }});
      if(req.files) {
        const img = req.files.img as UploadedFile
        img.mv(path.resolve(__dirname, "..", "static", fileName));
      }
      return res.json(device);
    } catch (e) {
      console.log(e)
      // next(ApiError.badRequest('Create device error'));
    }
    
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    let { brandId, typeId, limit = 6, page = 1 } = req.query;
    const myLimit: number = Number(limit)
    const myPage: number = Number(page)
    const myBrandId: number = Number(brandId)

    let offset = myPage * myLimit - myLimit;
    let devices;
    if (brandId === 'undefined' && typeId === 'undefined') {
      devices = await prisma.device.findMany({ skip: offset, take: myLimit });
    }
    if (brandId !== 'undefined' && typeId === 'undefined') {
      devices = await prisma.device.findMany({ where: { brandId: myBrandId }, skip: offset, take: myLimit })
    }
    if (brandId === 'undefined' && typeId !== 'undefined') {
      devices = await prisma.device.findMany({ where: { typeId: Number(typeId) }, skip: offset, take: myLimit });
    }

    return res.json(devices);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const device = await prisma.device.findUnique({
        where: { id: Number(id) },
      });
      if (device) {
        return res.json({
          id: device.id,
          name: device.name,
          price: device.price,
          rating: device.rating,
          img: device.img,
          typeId: device.typeId,
          brandId: device.brandId,
          title: device.title,
          description: device.description
        });
      }
      else return res.json('Device is not found')
    } catch (e) {
      return res.json(`Error: ${e}`)
    }
  }

  async getAllByIds(req: Request, res: Response, next: NextFunction) {
    let { deviceIds } = req.query;
    deviceIds = String(deviceIds).split(',')
    const myDeviceIds = deviceIds.map(id => {
      return Number(id)
    })

    const devices = await prisma.device.findMany({
      where: {
        id: {
          in: myDeviceIds
        }
      }
    })
    if (devices.length > 0) return res.json(devices)
    else return res.json('Devices are not found')
  }

  async getTotalCount(req: Request, res: Response, next: NextFunction) {
    const {brandId, typeId} = req.query
    let totalCount = 0
    if(brandId === 'undefined' && typeId === 'undefined') totalCount = await prisma.device.count()
    if(brandId !== 'undefined' && typeId === 'undefined') totalCount = await prisma.device.count({where: {brandId: Number(brandId)}})
    if(brandId === 'undefined' && typeId !== 'undefined') totalCount = await prisma.device.count({where: {typeId: Number(typeId)}})
    if(brandId !== 'undefined' && typeId !== 'undefined') totalCount = await prisma.device.count({where: {
      typeId: Number(typeId),
      brandId: Number(brandId)
    }})
    return res.json(totalCount)
  }
}

export default new DeviceController()
