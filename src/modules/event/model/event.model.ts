import mongoose, { Model } from 'mongoose';

//
import EventLikeModel from './eventLike.model';
import EventCommentModel from './eventComment.model';

//
import { IEvent } from '../type';

const Schema = mongoose.Schema;
const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * For cascade delete (eventLike)
 */
EventSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    await EventLikeModel.deleteMany({ eventId: this._id });
    next();
  } catch (err) {
    next(err as Error);
  }
});

/**
 * For cascade delete (eventComment)
 */
EventSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    await EventCommentModel.deleteMany({ eventId: this._id });
    next();
  } catch (err) {
    next(err as Error);
  }
});

const EventModel: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);
export type EventModelType = typeof EventModel;
export default EventModel;
