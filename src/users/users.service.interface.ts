import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

// В Сервис приходят DTO, например UserRegisterDto или UserLoginDto
// Методы сервиса обычно возвращают Entity, null или boolean
export interface IUserService {
  // При успешном создании возвращается User Model
  // null возвращается если такой пользователь уже есть
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
  getUserInfo: (email: string) => Promise<UserModel | null>;
}
