import express from 'express';

//
import { categoryController } from './index';

//
import { auth, roleMiddleware } from '../../middleware';
import { queryValidator } from '../../middleware/validator.middleware';

//
import { getCategorySchema } from './category.validation';

//
const categoryRouter = express.Router();

//
categoryRouter.route('/').get(auth, queryValidator(getCategorySchema), categoryController.get);
categoryRouter.route('/').post(auth, roleMiddleware.checkAdmin, categoryController.create);

//
export default categoryRouter;
