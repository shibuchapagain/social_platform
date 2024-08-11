import { Request, Response, NextFunction } from 'express';

//
import ApiResponse from '../../utils/api/apiResponse';

//
import { userService } from './index';

/**
 * User Controller
 */
class UserController {
  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await userService.getUserByEmail(req.body);

      //
      return new ApiResponse(res).addMessage('Fetched user details').send(response);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
