import express from 'express';

//
import { eventController } from './index';

//
import { auth, roleMiddleware } from '../../middleware';

//
import { bodyValidator, paramsValidator, queryValidator } from '../../middleware/validator.middleware';
import {
  createOrUpdateEventCommentSchema,
  createOrUpdateEventSchema,
  eventCommentIdParamSchema,
  eventIdParamSchema,
  getEventCommentSchema,
} from './event.validation';

//
const eventRouter = express.Router();

// FOR EVENT
eventRouter.route('/').get(auth, eventController.get);
eventRouter
  .route('/')
  .post(auth, roleMiddleware.checkExceptAdmin, bodyValidator(createOrUpdateEventSchema), eventController.create);
eventRouter
  .route('/:eventId')
  .get(auth, roleMiddleware.checkExceptAdmin, paramsValidator(eventIdParamSchema), eventController.getOne);

// FOR EVENT LIKE
eventRouter
  .route('/likeOrUnlike/:eventId')
  .post(auth, paramsValidator(eventIdParamSchema), eventController.eventLikeOrUnlike);

// FOR EVENT COMMENT
eventRouter
  .route('/event-comments/:eventId')
  .get(
    auth,
    paramsValidator(eventIdParamSchema),
    queryValidator(getEventCommentSchema),
    eventController.getCommentsByEventId,
  );
eventRouter
  .route('/comment')
  .post(auth, bodyValidator(createOrUpdateEventCommentSchema), eventController.createComment);

eventRouter
  .route('/comment/:id')
  .post(
    auth,
    paramsValidator(eventCommentIdParamSchema),
    bodyValidator(createOrUpdateEventCommentSchema),
    eventController.updateComment,
  );

eventRouter
  .route('/comment')
  .post(auth, bodyValidator(createOrUpdateEventCommentSchema), eventController.createComment);

//
export default eventRouter;
