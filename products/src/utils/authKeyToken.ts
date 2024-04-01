
import jwt from "jsonwebtoken"

import { NextFunction, Request, Response } from "express"
import { Types } from "mongoose"



const generateToken = async (payload: {id:Types.ObjectId, email:any},privateKey:string) =>{
    const accessToken = await jwt.sign(payload, privateKey,{
        expiresIn: "2 day"
    })
    const refreshToken= await jwt.sign(payload, privateKey,{
        expiresIn: "7 day"
    })
    return {accessToken, refreshToken}

}


const validateToken = async(token:string, privateKey:string) =>{
    const payload = await jwt.verify(token,privateKey)as{
        id:string,
        email:string
    }
    return payload
}

const asyncHandler = (fn:any) =>{
    return (req:Request, res: Response, next:NextFunction) =>{
        fn(req, res, next).catch(next)
    }
}

export {
    generateToken,
    validateToken,
    asyncHandler
}
