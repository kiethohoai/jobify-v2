import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

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

        throw new BadRequestError(errMessage);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 5, max: 20 })
    .withMessage('Name must be between 5 - 20 characters'),
]);
