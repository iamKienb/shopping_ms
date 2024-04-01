import { NextFunction, Response, Request } from "express";
import ProductService from "../services/product.service";
import statusCode from "../core/statusCode";
import HttpResponse from "../core/httpResponse";
import {createChannel, publicMessage} from "../utils/amqp";
import  config  from "../config";



export default class ProductController{

    static async getAllProduct  (req: Request, res: Response, next: NextFunction){
        const data = await ProductService.findAllProduct(req.query as unknown as {limit: number; sort: string; page: number})
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "get all product successfully", data))
    }
    static async getProductById  (req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const data = await ProductService.getProductById(id)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "get product successfully", data))
    }

    static async createProduct (req: Request, res: Response, next: NextFunction){
        const body = req.body
        const data = await ProductService.createProduct(body)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "create successfully", data))
    }
    static async getProductsByCategory (req: Request, res: Response, next: NextFunction){
        const type = req.params.type
        const data = await ProductService.getProductsByCategory(type)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "get product in category successfully", data))
    }
    static async getSelectedProducts(req: Request, res: Response, next: NextFunction){
        const productIds = req.body
        const data = await ProductService.getSelectedProducts(productIds)
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "get select product successfully", data))
    }

    static async addToWishList (req: Request, res: Response, next: NextFunction){
        const channel = await createChannel()
        const productId = req.body.id
        const qty = req.body.quantity
        const user_id = req.userId
        const data = await ProductService.getProductPayload(user_id, productId, qty, "ADD_TO_WISHLIST")
        publicMessage(channel, config.app.USER_BINDING_KEY, JSON.stringify(data))
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "add to wishlist successfully", data.data.product))
    }
    static async removeFromWishList(req: Request, res: Response, next: NextFunction){
        const channel = await createChannel()
        const productId = req.params.id
        const user_id = req.userId
        const qty = req.body.quantity
        const data = await ProductService.getProductPayload(user_id, productId, qty, "REMOVE_FROM_WISHLIST")
        publicMessage(channel, config.app.USER_BINDING_KEY, JSON.stringify(data))
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "remove wishlist successfully", data.data.product))
    }

    static async addToCart(req: Request, res: Response, next: NextFunction){
        const channel = await createChannel()
        const productId = req.body.id
        const qty = req.body.quantity
        const user_id = req.userId
        const data = await ProductService.getProductPayload(user_id, productId, qty, "ADD_TO_CART")
        publicMessage(channel, config.app.USER_BINDING_KEY, JSON.stringify(data))
        publicMessage(channel, config.app.SHOPPING_BINDING_KEY, JSON.stringify(data))
        const response = {
            product:data.data.product,
            unit:data.data.qty
        }
        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "add to cart successfully", response))
    }


    static async removeFromCart(req: Request, res: Response, next: NextFunction){
        const channel = await createChannel()
        const productId = req.params.id
        const qty = req.body.quantity
        const user_id = req.userId
        const data = await ProductService.getProductPayload(user_id, productId, qty, "REMOVE_FROM_CART")
        publicMessage(channel, config.app.USER_BINDING_KEY, JSON.stringify(data))
        publicMessage(channel, config.app.SHOPPING_BINDING_KEY, JSON.stringify(data))
        const response = {
            product:data.data.product,
            unit:data.data.qty
        }

        return res.status(statusCode.OK).json(new HttpResponse(statusCode.CREATED, "remove cart successfully", response))
    }

}