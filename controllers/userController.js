import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  // the old user before update (no property {new: true})
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  // remove old image in cloudinary if user upload a new image file
  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.uploader.destroy(updateUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
