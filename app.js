import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
      console.log(`Running on ENV = ${process.env.NODE_ENV}`);
      console.log('Connected to mongoDB.');
      
      startServer();
  })
  .catch((error) => {
      console.log('Unable to connect.');
      console.log(error);
      process.exit(1);
});

const startServer = async ()=>{
    const app = express();
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(express.json());

    await app.listen(3000);
}