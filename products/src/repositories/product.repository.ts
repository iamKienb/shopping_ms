import { Types } from "mongoose"
import productModel, { Product } from "../model/product.model"
export default class ProductRepo {
    static createProduct = async (body: Product) => {
       const product = await productModel.create(body)
       return product
    }

    static async findAllProduct({filter, limit, sort, page, select}: {filter:any, limit:number, sort:string , page:number, select:{} }) {
        const skip = (page - 1) * limit
        const sortBy = sort === 'ctime' ? {_id:-1} :{_id:1}
        const queryProduct = await productModel.find(filter).sort(sortBy as any).skip(skip).limit(limit).select(select)
        return  queryProduct
    }
    

    static async findProduct(id:string){
        const product = await productModel.findOne(new Types.ObjectId(id))
        return product
    }

    static async findByCategory(category:any){
        const product = await productModel.find({typ: category})
        return product
    }

    static async findSelectedProduct(productIds: []){
        const products = await productModel.find().where('_id').in(productIds.map(_id => _id))
        return products
    }


}
