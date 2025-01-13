import { nanoid } from 'nanoid';
import Job from '../models/JobModel.js';

//TODO DATA TEST
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

//TODO CREATE JOB
export const createJob = async (req, res) => {
  // data
  const { company, position } = req.body;

  // create
  const job = await Job.create({ company, position });

  // result
  res.status(201).json({ job });
};

// TODO GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

//TODO GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;

  // find job with id
  const job = await Job.findById(id);

  // guard
  if (!job) {
    return res.status(404).json({ msg: `no job found with id:${id}` });
  }

  // result
  res.status(200).json({ job });
};

//TODO UPDATE JOB (EDIT JOB)
export const updateJob = async (req, res) => {
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
};

//TODO DELETE JOB
export const deleteJob = async (req, res) => {
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
};
