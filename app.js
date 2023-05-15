import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { retryWrites: true, w: 'majority' })
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
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(router)

    await app.listen(process.env.APP_PORT);
}