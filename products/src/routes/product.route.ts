
import express from 'express';
import { asyncHandler } from '../utils/authKeyToken';
import authenticationToken from '../middlewares/authToken';

import ProductController from '../controller/product.controller';


const productRouter = express.Router();


productRouter.get('/',asyncHandler(ProductController.getAllProduct))
//authentication
productRouter.use(authenticationToken)
productRouter.post('/create',asyncHandler(ProductController.createProduct))
productRouter.get('/:id',asyncHandler(ProductController.getProductById))
productRouter.get('/category/:type' ,asyncHandler(ProductController.getProductsByCategory))
productRouter.post('/ids' ,asyncHandler(ProductController.getSelectedProducts))
productRouter.put('/wishlist' ,asyncHandler(ProductController.addToWishList))
productRouter.delete('/wishlist/:id' ,asyncHandler(ProductController.removeFromWishList))
productRouter.put('/cart' ,asyncHandler(ProductController.addToCart))
productRouter.delete('/cart/:id' ,asyncHandler(ProductController.removeFromCart))


export = productRouter