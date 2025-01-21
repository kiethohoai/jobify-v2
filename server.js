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
import { v2 as cloudinary } from 'cloudinary';

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//public folder
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//APP
const app = express();
const PORT = process.env.PORT || 5100;

//MIDDLEWARE
app.use(cookieParser());
app.use(express.json()); //accept json

//setup public folder
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //request logger
}

//ROUTES
app.use('/api/v1/jobs', authenticateUser, jobRoutes);
app.use('/api/v1/users', authenticateUser, userRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

//NOT-FOUND MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

//ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

//APP LISTENING
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`🚀APP RUNNING ON LOCALHOST:${PORT}`);
  });
} catch (error) {
  console.log(`🚀Error:`, error);
  process.exit(1);
}
