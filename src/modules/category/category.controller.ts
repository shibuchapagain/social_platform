import { Request, Response, NextFunction } from 'express';

//
import { categoryService } from './index';

//
import ApiResponse from '../../utils/api/apiResponse';

//
import type { IGetCategorySchemaType } from './category.validation';
import type { IEventCreateOrUpdateSchemaType } from '../event/event.validation';

/**
 * Category Controller
 */
class CategoryController {
  async get(req: Request<unknown, unknown, unknown, IGetCategorySchemaType>, res: Response, next: NextFunction) {
    try {
      const { data, count } = await categoryService.get(req.query);

      //
      return new ApiResponse(res).addMessage('Category fetched successfully').addMetadata({ count }).send(data);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request<unknown, unknown, IEventCreateOrUpdateSchemaType>, res: Response, next: NextFunction) {
    try {
      const response = await categoryService.create(req.body);

      //
      return new ApiResponse(res).addMessage('Category create successfully').send(response);
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
