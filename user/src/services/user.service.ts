import HttpException from "../core/httpException";
import statusCode from "../core/statusCode";
import UserRepo from "../repositories/user.repository";
import { Address, WishList } from "../types/user.type";


export default class UserService {
    static addAddress = async (User_id:string, body:Address) =>{
        const user = await UserRepo.findUserById(User_id);
        if(!user) return null
        const newAddress = await UserRepo.CreateAddress(body) 
        if(!newAddress){
            throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, "Error on Create Address")
        }
        user.address.push(newAddress)
        await user?.save()
        return user
        
    }

    static getUserById = async (user_Id:string) =>{
        const user = await UserRepo.findUserById(user_Id);
        return user
    }


    static findAllUser = async () =>{
        const user = await UserRepo.findAllUser();
        return user
    }

    static  getWishList = async (user_id:string) =>{
        const user = await UserRepo.wishList(user_id);
        return user
    }

    static addToWishList = async(user_id: string, product:WishList) =>{
        const wishList = await UserRepo.addWishListItem(user_id, product)
        return wishList
    }

    static mangeCart = async (user_Id: string, product:any, qty:number, isRemove:any) => {
        const cart = await UserRepo.addCartItem(user_Id, product, qty, isRemove )
        return cart
    }

    static mangeOrder = async (user_Id: string, order:any) =>{
        const orderResult = await UserRepo.addOrderToUser(user_Id, order)
        return orderResult
    }

    static async subscribeEvents(payload:string){
        console.log("User get payload from product: ",payload)
        const { event, data }: { event: string; data: any } = JSON.parse(payload);    
        switch(event){
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                UserService.addToWishList(data.userId,data.product)
                break;
            case 'ADD_TO_CART':
                UserService.mangeCart(data.userId,data.product,data.qty, false);
                break;
            case 'REMOVE_FROM_CART':
                UserService.mangeCart(data.userId, data.product, data.qty, true);
                break;
            case 'CREATE_ORDER':
                UserService.mangeOrder(data.userId, data.order);
                break;
            default:
                break;
        }
    }

}