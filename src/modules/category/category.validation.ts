import { object, string, InferType, number } from 'yup';

export const createCategorySchema = object({
  title: string()
    .min(2, 'Category name should be at least 2 characters')
    .max(50, 'Category name cannot be greater than 50 characters')
    .required('Category name is required'),
});

export const getCategorySchema = object({
  title: string().trim().optional(),
  limit: number().min(1, 'Limit should be at least 1').max(10, 'Maximum limit can not be greater than 10').optional(),
  page: number().min(1, 'Minimum page should be at least 1').optional(),
});

//
export type ICategoryCreateSchemaType = InferType<typeof createCategorySchema>;
export type IGetCategorySchemaType = InferType<typeof getCategorySchema>;
