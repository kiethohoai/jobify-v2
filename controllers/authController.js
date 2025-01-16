import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

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
  // find user from DB
  const user = await User.findOne({ email: req.body.email });

  // check user exists
  if (!user) throw new UnauthenticatedError('Invalid credentials');

  // compare password (input & database )
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password,
  );

  // Check valid password
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid credentials');

  res.status(200).json({ msg: 'Login Successfully' });
};
