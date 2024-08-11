import mongoose from 'mongoose';
import { IRegisterSchemaType, IUpdateProfileSchemaType } from './user.validation';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

//
export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser>;
  createUser(data: IRegisterSchemaType): Promise<IUser>;
  update(data: IUpdateProfileSchemaType, user: IUser): Promise<void>;
}
