import type { CategoryModelType } from './model/category.model';

//
import type { ICategory, ICategoryBusiness, ICategoryService, ICount } from './type';

//
import { BadRequestError } from '../../utils/api/apiError';
import { ICategoryCreateSchemaType, IGetCategorySchemaType } from './category.validation';

class EventService implements ICategoryService {
  private categoryModel;
  private business;
  constructor(categoryModel: CategoryModelType, business: ICategoryBusiness) {
    this.categoryModel = categoryModel;
    this.business = business;
  }

  async create(data: ICategoryCreateSchemaType): Promise<ICategory> {
    const category = await this.categoryModel.findOne({ title: data.title });

    if (category) {
      throw new BadRequestError('Category is already exist.');
    }

    //
    return await this.categoryModel.create({ ...data });
  }

  async get(query: IGetCategorySchemaType): Promise<ICount<ICategory>> {
    const { filterCondition, limit, page } = this.business.buildFilter(query);
    const count = await this.categoryModel.countDocuments(filterCondition);
    const data = await this.categoryModel
      .find(filterCondition)
      .limit(limit)
      .skip((page - 1) * limit);

    //
    return { data, count };
  }
}

//
export default EventService;
