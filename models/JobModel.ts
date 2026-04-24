import mongoose, { type InferSchemaType, type Model } from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export type IJob = InferSchemaType<typeof JobSchema>;

const Job: Model<IJob> = mongoose.model<IJob>('Job', JobSchema);
export default Job;
