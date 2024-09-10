//
import { EventLikeModelType } from './model/eventLike.model';
import { EventCommentModelType } from './model/eventComment.model';
import { CategoryModelType } from '../category/model/category.model';

import type { IUser } from '../auth/type';
import type { EventModelType } from './model/event.model';
import type {
  IEventService,
  IEvent,
  IEventBusiness,
  IEventFilter,
  ICount,
  IEventComment,
  IEventCommentFilter,
} from './type';
//

//
import { NotFoundError } from '../../utils/api/apiError';
import { IEventCommentCreateOrUpdateSchemaType, IEventCreateOrUpdateSchemaType } from './event.validation';

class EventService implements IEventService {
  private eventModel;
  private categoryModel;
  private eventLikeModel;
  private eventCommentModel;
  private business;
  constructor(
    eventModel: EventModelType,
    categoryModel: CategoryModelType,
    eventLikeModel: EventLikeModelType,
    eventCommentModel: EventCommentModelType,
    business: IEventBusiness,
  ) {
    this.eventModel = eventModel;
    this.categoryModel = categoryModel;
    this.eventLikeModel = eventLikeModel;
    this.eventCommentModel = eventCommentModel;
    this.business = business;
  }

  async _getEventById(id: string, user: IUser): Promise<IEvent> {
    const event = await this.eventModel.findOne({ _id: id, userId: user._id });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    //
    return event;
  }

  async create(data: IEventCreateOrUpdateSchemaType, user: IUser): Promise<IEvent> {
    const category = await this.categoryModel.findById(data.categoryId);
    if (!category) {
      throw new NotFoundError('Category not found');
    }

    //
    return await this.eventModel.create({ ...data, userId: user._id });
  }

  async get(query: IEventFilter, user: IUser): Promise<ICount<IEvent>> {
    const { limit, page } = this.business.buildFilter(query, user);
    const count = await this.eventModel.countDocuments();
    const data = await this.eventModel
      .find()
      .populate({
        path: 'categoryId',
        model: 'Category',
        select: 'title',
      })
      .limit(limit)
      .skip((page - 1) * limit);

    //
    return { data, count };
  }

  async getOne(id: string): Promise<IEvent> {
    const event = await this.eventModel.findOne({ _id: id });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    //
    return event;
  }

  async getCommentsByEventId(id: string, query: IEventCommentFilter): Promise<ICount<IEventComment>> {
    const event = await this.eventModel.findOne({ _id: id });
    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const { limit, page } = this.business.buildEventCommentFilter(query, event._id);
    const count = await this.eventCommentModel.countDocuments({ eventId: event._id });
    const data = await this.eventCommentModel
      .find({ eventId: event._id })
      .limit(limit)
      .skip((page - 1) * limit);

    //
    return { data, count };
  }

  // for like or unlike
  async eventLikeOrUnlike(eventId: string, user: IUser): Promise<void> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const isLike = await this.eventLikeModel.findOne({ eventId, userId: user._id });

    if (isLike) {
      // Unlike the event
      await this.eventLikeModel.deleteOne({ eventId, userId: user._id });
      await this.eventModel.updateOne({ _id: eventId }, { $inc: { likeCount: -1 } });
    } else {
      // Like the event
      await this.eventLikeModel.create({ eventId, userId: user._id });
      await this.eventModel.updateOne({ _id: eventId }, { $inc: { likeCount: 1 } });
    }
  }

  // FOR COMMENT
  async createComment(data: IEventCommentCreateOrUpdateSchemaType, user: IUser): Promise<IEventComment> {
    await this._getEventById(data.eventId, user);
    const comment = await this.eventCommentModel.create({ ...data, userId: user._id });
    await this.eventModel.updateOne({ _id: data.eventId }, { $inc: { commentCount: 1 } });
    return comment;
  }

  async updateComment(id: string, data: IEventCommentCreateOrUpdateSchemaType, user: IUser): Promise<void> {
    await this._getEventById(data.eventId, user);
    const comment = await this.eventCommentModel.findById(id);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }

    //
    await this.eventCommentModel.findByIdAndUpdate(id, { ...data });
  }
}

//
export default EventService;
