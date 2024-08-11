import EventModel from './model/event.model';

//
import EventService from './event.service';
import EventController from './event.controller';
import EventBusiness from './event.business';
import CategoryModel from '../category/model/category.model';
import EventLikeModel from './model/eventLike.model';
import EventCommentModel from './model/eventComment.model';

//
const business = new EventBusiness();
const eventController = new EventController();
const eventService = new EventService(EventModel, CategoryModel, EventLikeModel, EventCommentModel, business);

export { eventService, eventController };
