import type { UserModelType } from './model/user.model';

//
import { IUserService, IUser } from './type';

//
import { IRegisterSchemaType, IUpdateProfileSchemaType } from './user.validation';
import { hashPassword } from '../../utils/password.utils';
import { BadRequestError, ForbiddenError } from '../../utils/api/apiError';

class UserService implements IUserService {
  private userModel;
  constructor(userModel: UserModelType) {
    this.userModel = userModel;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    //
    return user;
  }

  async createUser(data: IRegisterSchemaType): Promise<IUser> {
    const user = await this.userModel.findOne({ email: data.email });

    if (user) {
      throw new BadRequestError('User already exists');
    }

    const newUser = await this.userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: await hashPassword(data.password),
      role: data.role,
    });

    //
    return newUser;
  }

  async update(data: IUpdateProfileSchemaType, user: IUser): Promise<void> {
    const userDetails = await this.userModel.findOne({ _id: user._id });
    if (!userDetails) {
      throw new ForbiddenError('User not found');
    }

    //
    await this.userModel.findByIdAndUpdate(user._id, { firstName: data.firstName, lastName: data.lastName });
    return;
  }
}

//
export default UserService;
