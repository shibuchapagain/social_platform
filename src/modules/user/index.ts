import UserModel from './model/user.model';

//
import UserService from './user.service';
import UserController from './user.controller';

//
const userService = new UserService(UserModel);
const userController = new UserController();

export { userService, userController };
