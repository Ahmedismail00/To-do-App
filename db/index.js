import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { retryWrites: true, w: 'majority' })
  .then(() => {
      console.log(`Running on ENV = ${process.env.NODE_ENV}`);
      console.log('Connected to mongoDB.');
      
    //   startServer();
  })
  .catch((error) => {
      console.log('Unable to connect.');
      console.log(error);
      process.exit(1);
});

const db = mongoose.connection

export default db;