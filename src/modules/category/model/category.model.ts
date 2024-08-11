import mongoose, { Model } from 'mongoose';

//
import type { ICategory } from '../type';

//
import EventModel from './../../event/model/event.model';

const Schema = mongoose.Schema;
const CategorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    await EventModel.deleteMany({ categoryId: this._id });
    next();
  } catch (err) {
    next(err as Error);
  }
});

const CategoryModel: Model<ICategory> = mongoose.model<ICategory>('Category', CategorySchema);
export type CategoryModelType = typeof CategoryModel;
export default CategoryModel;
