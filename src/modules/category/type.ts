import mongoose from 'mongoose';
import { ICategoryCreateSchemaType } from './category.validation';

export interface ICategory {
  _id: mongoose.Types.ObjectId;
  title: string;
}

export type ICategoryFilter = {
  title?: string;
  limit?: number;
  page?: number;
};

export interface ICount<T> {
  data: T[];
  count: number;
}

export interface ICategoryBusiness {
  buildFilter(filters: ICategoryFilter): { filterCondition: object; limit: number; page: number };
}

export interface ICategoryService {
  create(data: ICategoryCreateSchemaType): Promise<ICategory>;
  get(query: ICategoryFilter): Promise<ICount<ICategory>>;
}
