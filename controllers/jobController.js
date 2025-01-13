import { NotFoundError } from '../errors/customErrors.js';
import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

//TODO CREATE JOB
export const createJob = async (req, res) => {
  // data
  const { company, position } = req.body;

  // create
  const job = await Job.create({ company, position });

  // result
  res.status(StatusCodes.CREATED).json({ job });
};

// TODO GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs });
};

//TODO GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;

  // find job with id
  const job = await Job.findById(id);

  // guard
  if (!job) {
    throw new NotFoundError(`no job found with id:${id}`);
  }

  // result
  res.status(StatusCodes.OK).json({ job });
};

//TODO UPDATE JOB (EDIT JOB)
export const updateJob = async (req, res) => {
  // data
  const { id } = req.params;

  // find job with id
  const updateJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // guard
  if (!updateJob) {
    throw new NotFoundError(`no job found with id:${id}`);
  }

  // result
  res.status(StatusCodes.OK).json({ msg: 'job updated', job: updateJob });
};

//TODO DELETE JOB
export const deleteJob = async (req, res) => {
  // data
  const { id } = req.params;

  // find & delete job with id
  const removeJob = await Job.findByIdAndDelete(id);

  // guard
  if (!removeJob) {
    throw new NotFoundError(`no job found with id:${id}`);
  }

  // result
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removeJob });
};
