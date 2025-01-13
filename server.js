import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { nanoid } from 'nanoid';

// APP
const app = express();
const PORT = process.env.PORT || 5100;

// DATA TEST
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

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

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

//TODO CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  // data
  const { company, position } = req.body;

  // guard
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }

  // data #2
  const newJob = {
    id: nanoid(),
    company,
    position,
  };

  // create
  jobs.push(newJob);

  // result
  res.status(201).json({ msg: 'job created', job: newJob });
});

//TODO GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;

  // find job with id
  const job = jobs.find((job) => job.id === id);

  // guard
  if (!job) {
    return res.status(404).json({ msg: `no job found with id:${id}` });
  }

  // result
  res.status(200).json({ job });
});

//TODO EDIT JOB (UPDATE JOB)
app.patch('/api/v1/jobs/:id', (req, res) => {
  // data
  const { id } = req.params;
  const { company, position } = req.body;

  // guard #1
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }

  // find job with id
  const job = jobs.find((job) => job.id === id);

  // guard #2
  if (!job) {
    return res.status(404).json({ msg: `no job found with id:${id}` });
  }

  // update
  job.company = company;
  job.position = position;

  // result
  res.status(200).json({ msg: 'job updated', job });
});

//TODO DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  // data
  const { id } = req.params;

  // find job with id
  const job = jobs.find((job) => job.id === id);

  // guard
  if (!job) {
    return res.status(404).json({ msg: `no job found with id:${id}` });
  }

  // delete
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  // result
  res.status(200).json({ msg: 'job deleted', jobs });
});

// APP LISTENING
app.listen(PORT, () => {
  console.log(`🚀APP RUNNING ON LOCALHOST:${PORT}`);
});
