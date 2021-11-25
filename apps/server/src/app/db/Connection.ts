import * as mongoose from 'mongoose';

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

if (!MONGODB_PASSWORD) {
  throw new Error(
    'Please define MONGODB_PASSWORD environment variable inside .env file'
  );
}

const MONGODB_URI = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.58l9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connect = () => {
  return mongoose.connect(MONGODB_URI);
};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb connection error:'));
