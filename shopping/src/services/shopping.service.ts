import HttpException from "../core/httpException";
import statusCode from "../core/statusCode";
import ShoppingRepo from "../repositories/shopping.repository";



export default class ShoppingService {
    //Cart Info
    static async getCart(id:string){
        const cartItems  = await ShoppingRepo.getCart(id)
        if(!cartItems) throw new HttpException(statusCode.BAD_REQUEST,"cart not found")
        return cartItems
    } 

    static async mangeCart(user_id:string, item:any, qty:number, isRemove:boolean){
        const cartResult = await ShoppingRepo.manageCart(user_id, item,qty,isRemove)
        if(!cartResult) throw new HttpException(statusCode.BAD_REQUEST,"add cart fail")
        return cartResult
    }

    //Orders

    static async placeOrder(user_id:string, txnId: string){
        const orderResult = await ShoppingRepo.createNewOrder(user_id, txnId)
        if(!orderResult) throw new HttpException(statusCode.BAD_REQUEST,"create not expected")
        return orderResult
    }

    static async getOrders(user_id:string){
        const orders = await ShoppingRepo.getOrders(user_id)
        if(!orders) throw new HttpException(statusCode.BAD_REQUEST,"order not found")
        return orders
    }


    //get order detail
    
    static async subscribeEvents(payload:string){
        console.log("Shopping get payload from product: ",payload)
        const { event, data }: { event: string; data: any } = JSON.parse(payload);    
        switch(event){
            case 'ADD_TO_CART':
                ShoppingService.mangeCart(data.userId,data.product,data.qty, false);
                break;
            case 'REMOVE_FROM_CART':
                ShoppingService.mangeCart(data.userId, data.product, data.qty, true);
                break;
        }
    }

    static getOrderPayload = async(userId:string, order:any, event:string) =>{
        if(order){
            const payload = {
                event: event,
                data: {
                    userId, order
                }
            }
            return payload
        }
        throw new HttpException(statusCode.BAD_REQUEST, "no order is available")

    }

}