import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

//TODO CREATE JOB
export const createJob = async (req, res) => {
  // add createdBy property to req.body
  req.body.createdBy = req.user.userId;

  // create
  const job = await Job.create(req.body);

  // result
  res.status(StatusCodes.CREATED).json({ job });
};

// TODO GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

//TODO GET SINGLE JOB
export const getJob = async (req, res) => {
  // find job with id
  const job = await Job.findById(req.params.id);

  // result
  res.status(StatusCodes.OK).json({ job });
};

//TODO UPDATE JOB (EDIT JOB)
export const updateJob = async (req, res) => {
  // find job with id
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // result
  res.status(StatusCodes.OK).json({ msg: 'job updated', job: updateJob });
};

//TODO DELETE JOB
export const deleteJob = async (req, res) => {
  // find & delete job with id
  const removeJob = await Job.findByIdAndDelete(req.params.id);

  // result
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removeJob });
};
