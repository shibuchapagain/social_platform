import mongoose from 'mongoose';
import { IEventCreateOrUpdateSchemaType } from './event.validation';
import { IUser } from '../auth/type';
import { ICategory } from '../category/type';

export interface IEvent {
  save(arg0: { session: mongoose.mongo.ClientSession }): unknown;
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image: string;
  categoryId: mongoose.Types.ObjectId;
  category?: ICategory;
  userId: mongoose.Types.ObjectId;
  likeCount?: number;
  commentCount?: number;
}

export interface IEventLike {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
}

export interface IEventComment {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  comment: string;
}

export type IEventFilter = {
  title?: string;
  categoryTitle?: string;
  categoryId?: mongoose.Types.ObjectId;
  limit?: number;
  page?: number;
};

export type IEventCommentFilter = {
  limit?: number;
  page?: number;
};

export interface ICount<T> {
  data: T[];
  count: number;
}

export interface IEventBusiness {
  buildFilter(filters: IEventFilter, user: IUser): { filterCondition: object; limit: number; page: number };
  buildEventCommentFilter(
    filters: IEventCommentFilter,
    eventId: mongoose.Types.ObjectId,
  ): { limit: number; page: number };
}

export interface IEventService {
  create(data: IEventCreateOrUpdateSchemaType, user: IUser): Promise<IEvent>;
  get(query: IEventFilter, user: IUser): Promise<ICount<IEvent>>;
}
