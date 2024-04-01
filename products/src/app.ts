import cors from "cors";
import express, { Express, Request, Response, NextFunction} from "express";
import morgan from "morgan";
import helmet from 'helmet'
import compression from "compression";
import errorHandler from "./middlewares/error-handle";
import productRouter from "./routes/product.route";

export const expressApp = async (app: Express) => {
    
    //init middlewares  
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(compression());

    //init routes
    app.use('/', productRouter)
   
    //handle error
    app.use(errorHandler)


};
