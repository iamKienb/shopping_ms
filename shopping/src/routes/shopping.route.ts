
import express from 'express';
import { asyncHandler } from '../utils/authKeyToken';
import authenticationToken from '../middlewares/authToken';
import ShoppingController from '../controller/shopping.controller';



const shoppingRouter = express.Router();

//authentication
shoppingRouter.use(authenticationToken)
shoppingRouter.post('/order',asyncHandler(ShoppingController.createOrder))
shoppingRouter.post('/orders' ,asyncHandler(ShoppingController.getOrders))
shoppingRouter.get('/cart' ,asyncHandler(ShoppingController.getCart))





export = shoppingRouter