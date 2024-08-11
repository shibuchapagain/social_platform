import mongoose, { Model } from 'mongoose';
import { IUser, UserRole } from '../type';

const Schema = mongoose.Schema;
const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export type UserModelType = typeof UserModel;
export default UserModel;
