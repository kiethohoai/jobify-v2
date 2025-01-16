import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../utils/passwordUtils.js';

export const register = async (req, res) => {
  // auto add role for user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  // hash password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  // create user
  const user = await User.create(req.body);

  // send back result
  res.status(StatusCodes.CREATED).json({ msg: 'User Created' });
};

export const login = async (req, res) => {
  res.send('login');
};
