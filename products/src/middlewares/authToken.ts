import { NextFunction,Request ,Response } from "express";
import HttpResponse from "../core/httpResponse";
import { validateToken } from "../utils/authKeyToken";
declare global {
    namespace Express {
      interface Request {
        userId:string
      }
    }
  }
  
import config from '../config'
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
        // const customer = await ProductRepo.findProduct(payload.id)
        // if(!customer){
        //     return res.status(401).json({error: 'API TOKEN EXPIRED'})
        // }
        req.userId  = payload.id
    }catch(e){
        return res.sendStatus(401)
    }
    next()

}

export = authenticationToken