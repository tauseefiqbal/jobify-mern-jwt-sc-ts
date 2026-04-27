import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';

import jobRouter from '../routes/jobRouter.js';
import authRouter from '../routes/authRouter.js';
import userRouter from '../routes/userRouter.js';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.get('/api/v1/test', (_req: Request, res: Response) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorHandlerMiddleware);

// Cache the MongoDB connection across warm serverless invocations
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL is not defined');
  await mongoose.connect(mongoUrl);
  isConnected = true;
};

export default async function handler(req: Request, res: Response) {
  await connectDB();
  return app(req, res);
}
