import mongoose, { Schema, Types, model } from "mongoose";
import { Role, Address } from "../types/user.type";

export interface Product {
    _id: string;
    name: string;
    description: string;
    unit: number;
    price: number;
    category: string;
}
export  interface Cart {
    product: Product;
    unit: number;
}
export interface Order {
    _id: string;
    amount: number;
    date: Date;
}
interface User extends Document {
    email: string;
    password: string;
    phone: string;
    name: string;
    role: Role;
    cart: Cart[];
    wishlist: Product[];
    orders: Order[];
    address: Address[];
}
const UserSchema = new Schema<User>({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        required: true,
        enum: ["admin", "customer"],
        default: Role.CUSTOMER,
    },
  
    address:[
        { 
            _id:{ type: Schema.Types.ObjectId, ref: 'address', require: true },
            street: String,
            postalCode: String,
            city: String,
            country: String
        }
    ],

    cart:[
        {
            product:{
                _id:{type:String, required:true},
                name: {type:String, required:true},
                banner: {type:String, required:true},
                price: {type:Number, required:true},
            },
            unit:{type:Number, required:true}
        }
    ],

    wishlist:[
        {
            _id:{type:String, required:true},
            name: {type:String, required:true},
            desc: {type:String, required:true},
            banner: {type:String, required:true},
            available: {type:Boolean, required:true},
            price: {type:Number, required:true},
        }
    ],

    orders:[
        {
            _id: {type:String, required:true},
            amount:{type:String},
            date:{type:Date, default:Date.now()},
        }
    ]
},{
    
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps:true
}
)

export default model('user',UserSchema)