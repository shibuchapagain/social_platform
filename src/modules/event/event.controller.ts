import { Request, Response, NextFunction } from 'express';

//
import { eventService } from './index';

//
import ApiResponse from '../../utils/api/apiResponse';

//
import type { IEventFilter } from './type';
import type {
  IEventCommentCreateOrUpdateSchemaType,
  IEventCommentIDParamSchemaType,
  IEventCreateOrUpdateSchemaType,
  IEventIDParamSchemaType,
  IGetEventCommentSchemaType,
} from './event.validation';

/**
 * Event Controller
 */
class EventController {
  async create(req: Request<unknown, unknown, IEventCreateOrUpdateSchemaType>, res: Response, next: NextFunction) {
    try {
      const response = await eventService.create(req.body, req.user);

      //
      return new ApiResponse(res).addMessage('Event create successfully').send(response);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request<unknown, unknown, unknown, IEventFilter>, res: Response, next: NextFunction) {
    try {
      const { data, count } = await eventService.get(req.query, req.user);

      //
      return new ApiResponse(res).addMessage('Event fetched successfully').addMetadata({ count }).send(data);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request<IEventIDParamSchemaType>, res: Response, next: NextFunction) {
    try {
      const response = await eventService.getOne(req.params.eventId);

      //
      return new ApiResponse(res).addMessage('Event by ID fetched successfully').send(response);
    } catch (err) {
      next(err);
    }
  }

  // FOR EVENT LIKE:
  async getCommentsByEventId(
    req: Request<IEventIDParamSchemaType, IGetEventCommentSchemaType>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { data, count } = await eventService.getCommentsByEventId(req.params.eventId, req.query);

      //
      return new ApiResponse(res).addMessage('Event comments fetch successfully').addMetadata({ count }).send(data);
    } catch (err) {
      next(err);
    }
  }

  async eventLikeOrUnlike(req: Request<IEventIDParamSchemaType>, res: Response, next: NextFunction) {
    try {
      await eventService.eventLikeOrUnlike(req.params.eventId, req.user);

      //
      return new ApiResponse(res).addMessage('Event like operation successfully').send({});
    } catch (err) {
      next(err);
    }
  }

  // FOR EVENT COMMENT:
  async createComment(
    req: Request<unknown, unknown, IEventCommentCreateOrUpdateSchemaType>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await eventService.createComment(req.body, req.user);

      //
      return new ApiResponse(res).addMessage('Event comment operation successfully').send(response);
    } catch (err) {
      next(err);
    }
  }

  async updateComment(
    req: Request<IEventCommentIDParamSchemaType, unknown, IEventCommentCreateOrUpdateSchemaType>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await eventService.updateComment(req.params.id, req.body, req.user);

      //
      return new ApiResponse(res).addMessage('Event comment updated successfully').send({});
    } catch (err) {
      next(err);
    }
  }
}

export default EventController;
