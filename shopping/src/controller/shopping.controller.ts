import { NextFunction, Response, Request } from "express";
import statusCode from "../core/statusCode";
import HttpResponse from "../core/httpResponse";
import ShoppingService from "../services/shopping.service";
import { createChannel, publicMessage } from "../utils/amqp";
import config from "../config";


export default class ShoppingController{
    //Cart Info
    static async getCart (req:Request,res:Response,next:NextFunction)  {

        const user_id = req.userId;

        const data = await ShoppingService.getCart(user_id)
        
        res.status(200).json(new HttpResponse(statusCode.ACCEPTED, "get cart user successfully", data));

    };

    //Orders
    static async createOrder (req:Request,res:Response,next:NextFunction)  {
        const channel = await createChannel()
        const user_id = req.userId;
        const txnId = req.body.txnId;
        const data = await ShoppingService.placeOrder(user_id, txnId);
        const payload = await ShoppingService.getOrderPayload(user_id, data, 'CREATE_ORDER')
        publicMessage(channel, config.app.USER_BINDING_KEY, JSON.stringify(payload))


        res.status(200).json(new HttpResponse(statusCode.ACCEPTED, "created order successfully", data));

    };

    static async getOrders (req:Request,res:Response,next:NextFunction)  {

        const user_id = req.userId;

        const data = await ShoppingService.getOrders(user_id);
        
        res.status(200).json(new HttpResponse(statusCode.ACCEPTED, "get order user successfully", data));

    };

}