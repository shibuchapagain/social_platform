import mongoose, { Model } from 'mongoose';
import { IEventComment } from '../type';

const Schema = mongoose.Schema;
const EventCommentSchema = new Schema<IEventComment>(
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
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const EventCommentModel: Model<IEventComment> = mongoose.model<IEventComment>('EventComment', EventCommentSchema);

export type EventCommentModelType = typeof EventCommentModel;
export default EventCommentModel;
