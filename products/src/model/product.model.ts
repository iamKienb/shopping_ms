import mongoose, { Schema, model } from "mongoose";
export interface Product extends mongoose.Document{
    name: string,
    desc: string,
    banner: string,
    typ: string,
    unit: number,
    price: number,
    available: boolean,
    supplier : string,
}
const ProductSchema = new Schema<Product>({

    name: {type:String, required:true},
    desc: {type:String, required:true},
    banner: {type:String, required:true},
    typ: {type:String, required:true},
    unit: {type:Number, required:true},
    price: {type:Number, required:true},
    available: {type:Boolean, required:true},
    supplier : {type:String, required:true},
     
},{
    timestamps:true
})

export default model('product',ProductSchema)