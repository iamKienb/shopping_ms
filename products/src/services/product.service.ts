
import HttpException from "../core/httpException";
import statusCode from "../core/statusCode";
import { Product } from "../model/product.model";
import ProductRepo from "../repositories/product.repository";
import { unGetSelectData } from "../utils";

export default class ProductService {
    static createProduct = async (product:Product) =>{
        const newProduct = await ProductRepo.createProduct(product);
        if(!newProduct){
            throw new HttpException(statusCode.BAD_REQUEST, "unable  create product")
        }
        return newProduct

        
    }

    static getProductById = async (id:string) =>{
        const product = await ProductRepo.findProduct(id);
        if(!product) throw new HttpException(statusCode.BAD_REQUEST, "get product not found")
        return product
    }

    static findAllProduct= async ({limit = 50, sort = 'ctime', page =1}:{limit:number, sort:string, page:number} ) =>{   
        const selectProduct = ['__v' ]
        const select = unGetSelectData(selectProduct)
        const filter = {available: true}
        const products = await ProductRepo.findAllProduct({filter,limit, sort, page, select});
        if(!products) throw new HttpException(statusCode.BAD_REQUEST, "get all product failed")
        let categories = {}
        products.map(({typ}) =>{
            categories[typ] = typ;
        })
        const data = {
            products,
            categories:  Object.keys(categories)  
        }
        return data

    }

    static  getProductsByCategory = async (category:any) =>{
        const product = await ProductRepo.findByCategory(category);
        if(!product) throw new HttpException(statusCode.BAD_REQUEST, "get product by category failed");
        return product
    }

    static getSelectedProducts = async(productIds:any) =>{
        const product = await ProductRepo.findSelectedProduct(productIds)
        if(!product) throw new HttpException(statusCode.BAD_REQUEST, "data not found")
        return product
    }

    static getProductPayload = async(userId:string, productId:string, qty = null, event:string) =>{
        const product = await ProductRepo.findProduct(productId)
        if(product){
            const payload = {
                event: event,
                data: {
                    userId, product, qty
                }
            }
            return payload
        }
        throw new HttpException(statusCode.BAD_REQUEST, "get product payload failed")

    }


}