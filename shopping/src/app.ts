import cors from "cors";
import express, { Express, Request, Response, NextFunction} from "express";
import morgan from "morgan";
import helmet from 'helmet'
import compression from "compression";
import errorHandler from "./middlewares/error-handle";
import shoppingRouter from "./routes/shopping.route";
import { createChannel, subscribeMessage } from "./utils/amqp";
import ShoppingService from "./services/shopping.service";
export const expressApp = async (app: Express) => {
    const channel = await createChannel()
    //init middlewares
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(compression());

    //init routes
    subscribeMessage(channel, ShoppingService)
    app.use('/', shoppingRouter)

    //handle error
    app.use(errorHandler)


};
