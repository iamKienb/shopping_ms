import mongoose, { Schema, model } from "mongoose";
import { Address } from "../types/user.type";

const AddressSchema = new Schema<Address>({
    street: String,
    postalCode: String,
    city: String,
    country: String
},{
    timestamps:true
})

export default model('address',AddressSchema)