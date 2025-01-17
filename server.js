import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import jobRoutes from './routes/jobRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middleware/authMiddleware.js';

//TODO APP
const app = express();
const PORT = process.env.PORT || 5100;

//TODO MIDDLEWARE
app.use(cookieParser());
app.use(express.json()); //accept json
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //request logger
}

//TODO ROUTES
app.use('/api/v1/jobs', authenticateUser, jobRoutes);
app.use('/api/v1/users', authenticateUser, userRoutes);
app.use('/api/v1/auth', authRoutes);

// TODO NOT-FOUND MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

// TODO ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

//TODO APP LISTENING
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`🚀APP RUNNING ON LOCALHOST:${PORT}`);
  });
} catch (error) {
  console.log(`🚀Error:`, error);
  process.exit(1);
}
