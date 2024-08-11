//
import { IAuthService, IUser, IUserResponse } from './type';
import { jwtHelper } from '../../utils/jwt.helper';

//
import { IUpdateProfileSchemaType } from '../user/user.validation';
import { ILoginSchemaType, IRegisterSchemaType } from './auth.validation';

//
import { verifyPassword } from '../../utils/password.utils';
import { ForbiddenError } from '../../utils/api/apiError';

//
import { IUserService } from '../user/type';

class AuthService implements IAuthService {
  private userService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async login(data: ILoginSchemaType): Promise<{ user: IUserResponse; accessToken: string; refreshToken: string }> {
    const user = await this.userService.getUserByEmail(data.email);
    const checkPassword = await verifyPassword(user.password, data.password);
    if (!checkPassword) {
      throw new ForbiddenError('Invalid password');
    }

    //
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    const { accessToken, refreshToken } = await jwtHelper.createJwtToken(payload);

    //
    return {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async register(data: IRegisterSchemaType): Promise<IUser> {
    const user = await this.userService.createUser(data);
    return user;
  }

  async update(data: IUpdateProfileSchemaType, user: IUser): Promise<void> {
    await this.userService.update(data, user);
    return;
  }
}
export default AuthService;
