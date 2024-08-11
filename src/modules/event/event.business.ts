import mongoose from 'mongoose';
import { IUser } from '../auth/type';
import { IEventBusiness, IEventCommentFilter, IEventFilter } from './type';

export default class EventBusiness implements IEventBusiness {
  buildFilter(filters: IEventFilter, user: IUser) {
    const filterCondition = {
      ...(filters.title
        ? {
            title: { $regex: filters.title, $options: 'i' },
          }
        : {}),

      ...(user._id
        ? {
            userId: user._id,
          }
        : {}),
    };

    const page = filters.page ? Number(filters.page) : 1;
    const limit = filters.limit ? Number(filters.limit) : 10;

    return { filterCondition, limit, page };
  }

  buildEventCommentFilter(filters: IEventCommentFilter, eventId: mongoose.Types.ObjectId) {
    const filterCondition = {
      ...(eventId
        ? {
            eventId,
          }
        : {}),
    };
    const page = filters.page ? Number(filters.page) : 1;
    const limit = filters.limit ? Number(filters.limit) : 10;

    return { filterCondition, limit, page };
  }
}
