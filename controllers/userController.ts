import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user?.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  await User.findByIdAndUpdate(req.user.userId, newUser);

  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
