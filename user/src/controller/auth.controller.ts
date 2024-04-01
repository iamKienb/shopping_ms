import { NextFunction, Response, Request } from "express";
import { signInDto, signUpDto } from "../dtos/customer.dto";
import authService from "../services/auth.service";
import statusCode from "../core/statusCode";
import HttpResponse from "../core/httpResponse";
export default class authController{
    static signUp = async (req: Request, res: Response, next: NextFunction) =>{
        const body = <signUpDto>req.body;
        console.log(body);
        const {passwordConfirmation, ...other} = body
        const data = await authService.signUp(other)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "sign up successfully", data))
    }

    static signIn = async (req: Request, res: Response, next: NextFunction) =>{
        const body = <signInDto>req.body;
        const data = await authService.signIn(body)
        console.log(data);
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "sign in successfully", data))
    }
}