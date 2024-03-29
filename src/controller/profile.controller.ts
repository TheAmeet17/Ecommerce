import { NextFunction, Request, Response } from 'express'
import * as ProfileService from '../services/profile.service'
import HttpStatusCode from 'http-status-codes'
import { RequestWithUserObject } from '../types'
export const getProfile = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await ProfileService.get(req.user.id)
        res.json(users)
    } catch (e) {
        next(e)
    }
}

export const updateProfile = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await ProfileService.update(req.user.id, req.body)
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}