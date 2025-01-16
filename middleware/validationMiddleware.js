import { body, validationResult, param } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMessage = errors
          .array()
          .map((err) => err.msg)
          .join('. ');

        if (errMessage[0].startsWith('no job')) {
          throw new NotFoundError(errMessage);
        }

        throw new BadRequestError(errMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('Company is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('jobLocation').notEmpty().withMessage('Job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid job status values'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid job type values'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('Invalid MongoDB ID');

    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`No job found with id:${id}`);
    }

    // TODO CHECK OWNER
    console.log(`🚀CHECK > req.user.userId:`, req.user.userId);
    console.log(`🚀CHECK > job.createdBy:`, job.createdBy.toString());

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    console.log(`🚀CHECK > isOwner:`, isOwner);
    console.log(`🚀CHECK > isAdmin:`, isAdmin);

    // check owner
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError('not authorized to access this route!');
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) throw new BadRequestError('Email already exists');
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 charaters long'),
  body('lastName').notEmpty().withMessage('Last Name is required'),
  body('location').notEmpty().withMessage('Location is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 charaters long'),
]);
