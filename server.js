import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import jobRoutes from './routes/jobRoutes.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { validateTest } from './middleware/validationMiddleware.js';

//TODO APP
const app = express();
const PORT = process.env.PORT || 5100;

//TODO MIDDLEWARE
app.use(express.json()); //accept json
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //request logger
}

//TODO ROUTES
app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` });
});

app.use('/api/v1/jobs', jobRoutes);

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
