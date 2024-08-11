import express from 'express';

//
import { authController } from './index';
import { loginSchema, registerSchema } from './auth.validation';

//
import { auth } from '../../middleware';
import { bodyValidator } from '../../middleware/validator.middleware';
import { updateProfileSchema } from '../user/user.validation';

//
const authRouter = express.Router();

//
authRouter.route('/me').get(auth, authController.me);
authRouter.route('/login').post(bodyValidator(loginSchema), authController.login);
authRouter.route('/register').post(bodyValidator(registerSchema), authController.register);
authRouter.route('/update-profile').patch(auth, bodyValidator(updateProfileSchema), authController.update);

//
export default authRouter;
