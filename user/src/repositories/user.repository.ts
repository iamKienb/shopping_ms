import { Types } from "mongoose"
import HttpException from "../core/httpException"
import statusCode from "../core/statusCode"
import AddressModel from "../model/address.model"
import UserModel from "../model/user.model"
import { Address, User } from "../types/user.type"


export default class UserRepo {
    static createUser = async (body: User) => {
        try{
            const user = new UserModel({
                name: body.name,
                email: body.email,
                password: body.password,
                phone: body.phone,
            })
            const result = await user.save()
            return result
        }catch(e){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "create user failed")
        }
    }

    static CreateAddress = async (body: Address) => {
        if(!body){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Your address must be provide")
        }
        const newAddress = await AddressModel.create(body)
        return  newAddress
    }

    static async findUser(email: string) {
        try {
            const existingUser = await UserModel.findOne({ email: email });
            return existingUser;
        } catch (e) {
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Unable to Find User");
        }
    }
    

    static async findUserById(id: string){
        try{
            const existingUser  = await UserModel.findById(id)
            return existingUser
        }catch(e){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Unable to Find User")
        }
    }

    static async findAllUser(){
        try{
            const existingUser  = await UserModel.find()
            return existingUser
        }catch(e){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Unable to Find User")
        }
    }

    static async wishList(User_id: string){
        const user = await UserModel.findById(new Types.ObjectId(User_id)).populate('wishlist')
        if(!user){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Unable to Find User");
        }
        return user.wishlist
    }

    static async addWishListItem(User_id:string, product:any){
        const user = await UserModel.findById(new Types.ObjectId(User_id)).populate('wishlist')
        if(!user){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Unable to Find User");
        }
        let wishlist = user.wishlist
        if(wishlist.length > 0){
            let isExist = false;
            wishlist.map(async (item) =>{
                if(item._id.toString() === product._id.toString()){
                    await UserModel.findByIdAndUpdate(User_id,{
                        $pull:{
                            wishlist:{
                                _id:product._id.toString(), 
                            }
                        }
                    })
                }
            })

            if(!isExist){
                wishlist.push(product)
            }
        }
        wishlist.push(product)
        user.wishlist = wishlist
        const result = await user.save()
        if(!result){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Unable to add  to wishlist ");
        }
        return result.wishlist

    }

    static async addCartItem(User_id:string, product: any, qty:number, isRemove:any){
        const user = await UserModel.findById(User_id).populate('cart')
        const cartItem = {
            product,
            unit: qty,
        }
        if(user){
        let isExist = false;
        let cartItems = user.cart
        if(cartItems.length > 0){
            cartItems.map((item) =>{
                if(item.product?._id.toString() === product._id.toString()){
                    if(isRemove){
                        cartItems.splice(cartItems.indexOf(item), 1)
                    }
                    else{
                        item.unit = item.unit +qty
                    }
                }
                isExist = true
            })
        }

        cartItems.push(cartItem)
        user.cart = cartItems
        return await user.save()
        }
        else{
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "unable to  add cart");
        }
    }
    static async addOrderToUser(User_id:string, order:any){
        const user = await UserModel.findById(User_id).populate('cart')
        if(!user){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Unable to Find User");
        }
        user.orders.push(order);
        const result = await user.save()
        if(!result){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "unable to add to order");
        }
        return result.orders;

    }
}
