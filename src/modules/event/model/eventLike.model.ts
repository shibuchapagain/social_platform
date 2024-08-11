import mongoose, { Model } from 'mongoose';
import { IEventLike } from '../type';

const Schema = mongoose.Schema;
const EventLikeSchema = new Schema<IEventLike>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
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

const EventLikeModel: Model<IEventLike> = mongoose.model<IEventLike>('EventLike', EventLikeSchema);

export type EventLikeModelType = typeof EventLikeModel;
export default EventLikeModel;
