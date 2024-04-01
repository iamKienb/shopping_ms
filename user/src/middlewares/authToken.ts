import { NextFunction,Request ,Response } from "express";
import HttpResponse from "../core/httpResponse";
import { validateToken } from "../utils/authKeyToken";
import config from '../config'
import UserRepo from "../repositories/user.repository";
 const authenticationToken = async(req: Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader){
        return res.status(401).json(new HttpResponse(401,"authorized", null))
    }
    const token = authHeader.split(" ")[1]
    try{
        const payload = await validateToken(token, config.app.private_key) as{
            id: string,
            email: string
        }
        const user = await UserRepo.findUserById(payload.id)
        if(!user){
            return res.status(401).json({error: 'API TOKEN EXPIRED'})
        }
        req.userId = user._id.toString()
    }catch(e){
        return res.sendStatus(401)
    }
    next()

}

export = authenticationToken