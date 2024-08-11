import CategoryModel from './model/category.model';

//
import CategoryService from './category.service';
import CategoryController from './category.controller';
import CategoryBusiness from './category.business';

//
const business = new CategoryBusiness();
const categoryController = new CategoryController();
const categoryService = new CategoryService(CategoryModel, business);

export { categoryService, categoryController };
