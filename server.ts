import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World');
});

app.get('/api/v1/test', (_req: Request, res: Response) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL is not defined');
  await mongoose.connect(mongoUrl);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
