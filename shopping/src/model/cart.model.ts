import mongoose, { Schema, model } from "mongoose";
export interface Cart extends mongoose.Document{
    userId: string;
    items:[
        {
            product:{
                _id: string,
                name: string,
                img: string,
                unit: number,
                price: number,
            },
            unit: number
        }
    ]
}
const CartSchema = new Schema <Cart>({
    userId: String,
    items:[
        {
            product: {
                _id:{type: String, required: true},
                name: {type: String},
                img: {type: String},
                unit: {type: Number},
                price: {type: Number},
            },
            unit: {type:Number, require: true}
        }
    ]
},{
    timestamps:true
})

export default model('cart',CartSchema)