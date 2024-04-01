import { NextFunction, Response, Request } from "express";
import UserService from "../services/user.service";
import statusCode from "../core/statusCode";
import HttpResponse from "../core/httpResponse";

export default class UserController{
    static async getAllUser (req: Request, res: Response, next: NextFunction){
        const data = await UserService.findAllUser()
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "get all user successfully", data))
    }
    static async getUserById  (req: Request, res: Response, next: NextFunction){
        const id = req.userId
        const data = await UserService.getUserById(id)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "get user successfully", data))
    }

    static async addAddress  (req: Request, res: Response, next: NextFunction){
        const body = req.body
        const user_id = req.userId
        const data = await UserService.addAddress(user_id, body)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "add address successfully", data))
    }
    static async getWishList (req: Request, res: Response, next: NextFunction){
        const user_id = req.userId
        const data = await UserService.getWishList(user_id)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "get wishlist successfully", data))
    }

}