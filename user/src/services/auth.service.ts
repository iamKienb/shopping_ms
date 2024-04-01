import HttpException from "../core/httpException"
import statusCode from "../core/statusCode"
import UserRepo from "../repositories/user.repository"
import { User } from "../types/user.type"
import { generateToken } from "../utils/authKeyToken"
import { hashPassword, validatePassword } from "../utils/handlePassword"
import config from '../config';
import { signInDto } from "../dtos/customer.dto"
export default class authService {
    static signUp = async (body:User) =>{
        const checkEmailExists = await UserRepo.findUser(body.email)
        console.log(checkEmailExists)
        if(checkEmailExists){
            throw new HttpException(statusCode.BAD_REQUEST, "email already exists")
        }
        body.password = await hashPassword(body.password)
        const newCustomer = await UserRepo.createUser(body)
        const tokens = await generateToken({id: newCustomer._id, email: newCustomer.email}, config.app.private_key)
        if(!tokens){
            throw new HttpException(statusCode.FORBIDDEN, "Token Forbidden")
        }
        return {
            newCustomer,
            token: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        }
    }

    static signIn  = async (body:signInDto) =>{
        const customer = await UserRepo.findUser(body.email) 
        if (!customer) {
            throw new HttpException(statusCode.NOT_FOUND, "Customer not found");
        }
        const checkPassword = await validatePassword(body.password, customer.password as string)
        if(!checkPassword){
            throw new HttpException(statusCode.BAD_REQUEST, "password or email are wrong")
        }
        const tokens = await generateToken({id: customer._id, email: customer.email}, config.app.private_key)
        if(!tokens){
            throw new HttpException(statusCode.FORBIDDEN, "Token Forbidden")
        }
        return {
            token: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        }
    }
}