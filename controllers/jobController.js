import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import day from 'dayjs';
import mongoose from 'mongoose';

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
  // data form query
  const { search, jobStatus, jobType, sort } = req.query;

  // query obj
  const queryObj = {
    createdBy: req.user.userId,
  };

  // search query
  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  // jobStatus query
  if (jobStatus && jobStatus !== 'all') {
    queryObj.jobStatus = jobStatus;
  }

  // jobType query
  if (jobType && jobType !== 'all') {
    queryObj.jobType = jobType;
  }

  // sort query
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  // pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);

  // query to db
  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, currentPage: page, numOfPages, jobs });
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

//TODO showStats
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, cur) => {
    const { _id, count } = cur;
    acc[_id] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const { _id, count } = item;
      const { month, year } = _id;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
