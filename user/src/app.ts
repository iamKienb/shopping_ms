import cors from "cors";
import express, { Express, Request, Response, NextFunction} from "express";
import morgan from "morgan";
import helmet from 'helmet'
import compression from "compression";
import errorHandler from "./middlewares/error-handle";
import userRouter from "./routes/user.route";
import UserService from "./services/user.service";
import { createChannel, subscribeMessage } from "./utils/amqp";


export const expressApp = async (app: Express) => {
    const channel = await createChannel()
    //init middlewares
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(compression());

    //init routes
    subscribeMessage(channel, UserService)
    app.use('/', userRouter)
   


    //handle error
    app.use(errorHandler)


};
