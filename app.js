import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import router from "./routes/index.js";
import db from "./db/index.js"


const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router)

app.listen(process.env.APP_PORT);


