
import express from 'express';
import { asyncHandler } from '../utils/authKeyToken';
import { validationResource } from '../middlewares/validationResource';
import { signInSchema, signUpSchema } from '../dtos/customer.dto';
import authController from '../controller/auth.controller';
import authenticationToken from '../middlewares/authToken';
import UserController from '../controller/user.controller';



const userRouter = express.Router();
userRouter.post('/signUp', validationResource(signUpSchema) ,asyncHandler(authController.signUp))
userRouter.post('/signIn', validationResource(signInSchema) ,asyncHandler(authController.signIn))
userRouter.get('/',asyncHandler(UserController.getAllUser))

//authentication
userRouter.use(authenticationToken)
userRouter.get('/profile/:id',asyncHandler(UserController.getUserById))
userRouter.post('/address' ,asyncHandler(UserController.addAddress))
userRouter.get('/wishlist' ,asyncHandler(UserController.getWishList))


export = userRouter