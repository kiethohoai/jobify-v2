import Job from '../models/JobModel.js';

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

  // find job with id
  const updateJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // guard
  if (!updateJob) {
    return res.status(404).json({ msg: `no job found with id:${id}` });
  }

  // result
  res.status(200).json({ msg: 'job updated', job: updateJob });
};

//TODO DELETE JOB
export const deleteJob = async (req, res) => {
  // data
  const { id } = req.params;

  // find & delete job with id
  const removeJob = await Job.findByIdAndDelete(id);

  // guard
  if (!removeJob) {
    return res.status(404).json({ msg: `no job found with id:${id}` });
  }

  // result
  res.status(200).json({ msg: 'job deleted', job: removeJob });
};
