import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';

export default function (req: Request, res: Response, next: NextFunction, err: Error) {
    // if (err instanceof ApiError) {
    //     return res.status(err.status).json({message: err.message})
    // }
    // return res.status(500).json({message: "Непредвиденная ошибка!"})
}
