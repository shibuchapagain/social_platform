import { object, string, date, InferType, number } from 'yup';

export const createOrUpdateEventSchema = object({
  title: string()
    .trim()
    .min(2, 'Event name should be at least 2 characters')
    .max(50, 'Event name cannot be greater than 50 characters')
    .required('Event name is required'),
  description: string()
    .min(2, 'Description should be at least 2 characters')
    .max(100, 'Description cannot be greater than 100 characters')
    .required('Description is required'),
  date: date().required('Date is required'),
  time: string()
    .matches(/^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/, 'Invalid time format')
    .required('Time is required'),
  location: string().required('Location is required'),
  image: string().optional(),
  categoryId: string().required('Category ID is required'),
});

export const createOrUpdateEventLikeSchema = object({
  eventId: string().required('Event ID is required'),
});

export const createOrUpdateEventCommentSchema = object({
  eventId: string().required('Event ID is required'),
  comment: string()
    .trim()
    .min(2, 'Minimum should be 2 character')
    .max(50, 'Maximum length can not be greater than 50 character')
    .required('Comment is required'),
});

export const eventCommentIdParamSchema = object({
  id: string().required('Event Comment ID is required'),
});

export const getEventSchema = object({
  title: string().trim().optional(),
  limit: number().min(1, 'Limit should be at least 1').max(10, 'Maximum limit can not be greater than 10').optional(),
  page: number().min(1, 'Minimum page should be at least 1').optional(),
});

export const getEventCommentSchema = object({
  limit: number().min(1, 'Limit should be at least 1').max(10, 'Maximum limit can not be greater than 10').optional(),
  page: number().min(1, 'Minimum page should be at least 1').optional(),
});

export const eventIdParamSchema = object({
  eventId: string().required('Event ID is required'),
});

//
export type IGetEventSchemaType = InferType<typeof getEventSchema>;
export type IGetEventCommentSchemaType = InferType<typeof getEventCommentSchema>;
export type IEventCreateOrUpdateSchemaType = InferType<typeof createOrUpdateEventSchema>;
export type IEventCommentCreateOrUpdateSchemaType = InferType<typeof createOrUpdateEventCommentSchema>;
export type IEventLikeCreateOrUpdateSchemaType = InferType<typeof createOrUpdateEventLikeSchema>;

//
export type IEventIDParamSchemaType = InferType<typeof eventIdParamSchema>;
export type IEventCommentIDParamSchemaType = InferType<typeof eventCommentIdParamSchema>;
