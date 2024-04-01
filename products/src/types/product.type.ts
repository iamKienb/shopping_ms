
import mongoose from "mongoose";


export interface Customer{
  email: string;
  name: string;
  phone: string;
  password: string;

}

export interface Address extends  mongoose.Document{
  street: string,
  postalCode: string,
  city: string,
  country: string
}
export interface WishList extends  mongoose.Document{
    _id: string,
    name: string,
    description: string,
    banner: string
    available: boolean,
    price:number
}