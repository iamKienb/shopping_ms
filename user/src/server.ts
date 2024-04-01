import express, { Express } from "express";
import { expressApp } from "./app";
import config from "./config";
import connectDB from './db/init.mongodb'
const PORT = +config.app.port! | 8001;
const startApp = async (app: Express) => {
  try {
   
    expressApp(app);
    connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startApp(express());
