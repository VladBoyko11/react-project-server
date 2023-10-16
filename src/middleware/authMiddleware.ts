import { NextFunction, Request, Response } from "express"

import jwt from 'jsonwebtoken'

const sercetKey = 'random_secret_key123'
export default function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        let token = req.headers.authorization // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        } else {
            token = token.split(' ')[1]
            const decoded = jwt.verify(token, sercetKey)
            req.body.user = decoded
            next()
        }
        // const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // req.user = decoded
        // next(decoded)
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};
