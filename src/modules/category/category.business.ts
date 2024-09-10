import { ICategoryBusiness, ICategoryFilter } from './type';

export default class CategoryBusiness implements ICategoryBusiness {
  buildFilter(filters: ICategoryFilter) {
    const filterCondition = {
      ...(filters.title
        ? {
            title: { $regex: filters.title, $options: 'i' },
          }
        : {}),
    } as object;

    const page = filters.page ? Number(filters.page) : 1;
    const limit = filters.limit ? Number(filters.limit) : 10;

    return { filterCondition, limit, page };
  }
}
