import express from 'express';
import { login, register } from '../controllers/authController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

export default router;
