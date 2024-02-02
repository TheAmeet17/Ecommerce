import { NextFunction, Request, Response } from 'express'
import * as ProductService from '../services/product.service'
import HttpStatusCode from 'http-status-codes'
import { Product } from '@prisma/client'

export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await ProductService.get()
        res.json(users)
    } catch (e) {
        next(e)
    }
}
export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.create(req.body as Product)
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

export const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.remove(Number(req.params.id))
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

export const getOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.getById(Number(req.params.id))
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

export const updateOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProductService.update(
            Number(req.params.id),
            req.body as Product
        )
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}