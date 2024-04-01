import orderModel from "../model/order.model"
import cartModel from "../model/cart.model"
import HttpException from "../core/httpException"
import statusCode from "../core/statusCode"
import _ from "lodash"

export default class ShoppingRepo {
    static getCart = async (user_id: string) => {
        return await orderModel.findOne({
            userId : user_id
        })
    }

    static async manageCart(user_id:string, product: any, qty:number, isRemove:boolean){
        const cart = await cartModel.findOne({userId: user_id})
        if(cart){
            if(isRemove){
                //handle remove 
                cart.items.map((item) => {
                    if (item.product._id.toString() === product._id.toString()) {
                        cart.items.splice(cart.items.indexOf(item), 1);
                    }
                })
            }else{
                const cartIndex = _.findIndex(cart.items,{
                    product:{_id: product._id}
                })

                if(cartIndex > -1){
                    cart.items[cartIndex].unit += qty 
                
                }else{
                    cart.items.push({
                        product:{
                            ...product
                        },
                        unit: qty
                    })
                }
            }
            return await cart.save()
        }else{
            return await cartModel.create({
                userId: user_id, 
                items:[{
                    product:{
                        ...product
                    },
                    unit: qty
                }]
            })
        }
    }


    //Orders
    static getOrders = async (user_id: string) => {
        return await orderModel.findOne({
            userId : user_id
        })
    }
    static async createNewOrder(user_id:string, txnId:string){
        try{
            const cart = await cartModel.findOne({
                userId :user_id
            })
            if(cart){
                let amount = 0;
                let cartItems = cart.items
                if(cartItems.length > 0){
                    cartItems.map((item) =>{
                        amount += item.product.price * item.unit
                    })  
                    const order = orderModel.create({
                        userId: user_id,
                        amount,
                        txnId,
                        status: "received",
                        items: cartItems
                    })
                    await cart.save()
                    return order
                }
            }
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "cart not found ");
        }catch (error) {
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "create order fail");
        }
    }
}
