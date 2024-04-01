import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export interface User{
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


export type CreateAddressInput = {
  street: string;
  postalCode: number;
  city: string;
  country: string;
};

export type WishList= {
  _id: string;
  name: string;
  description: string;
  unit: number;
  price: number;
  category: string;
};

export enum Role {
  ADMIN = "admin",
  CUSTOMER = "customer",
}