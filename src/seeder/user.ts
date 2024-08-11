import UserModel from '../modules/user/model/user.model';

//
import { userService } from '../modules/user';

//
import { UserRole } from '../modules/user/type';
import { hashPassword } from '../utils/password.utils';

/**
 * FOR CREATE ADMIN:
 */
export async function createAdminUser() {
  const isAdminExist = await UserModel.countDocuments({ email: 'admin@gmail.com' });
  if (isAdminExist) return;
  await userService.createUser({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gmail.com',
    password: await hashPassword('Pass@123'),
    role: UserRole.ADMIN,
  });
}
