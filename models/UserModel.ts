import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export type IUser = InferSchemaType<typeof UserSchema>;

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
