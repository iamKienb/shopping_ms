import mongoose, { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    userId: String,
    amount: Number,
    status: String,
    txnId: String,
    items:[
        {
            product: {
                _id:{type: String, required: true},
                name: {type: String, required: true},
                desc: {type: String, required: true},
                banner: {type: String, required: true},
                typ: {type: String, required: true},
                unit: {type: Number, required: true},
                price: {type: Number, required: true},
                supplier: {type: String, required: true}
            },
            unit: {type:Number, require: true}
        }
    ],
    
},{
    timestamps:true
})

export default model('order',OrderSchema)