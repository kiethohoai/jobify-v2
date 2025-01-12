import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

// APP
const app = express();
const PORT = process.env.PORT || 5100;

// MIDDLEWARE
app.use(express.json()); //accept json
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //request logger
}

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello From Server');
});

app.post('/', (req, res) => {
  console.log(`🚀CHECK > req:`, req.body);
  res.json({ msg: 'data received', data: req.body });
});

// APP LISTENING
app.listen(PORT, () => {
  console.log(`🚀APP RUNNING ON LOCALHOST:${PORT}`);
});
