import express from 'express';
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { validateJobInput } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

// EXPORT
export default router;
