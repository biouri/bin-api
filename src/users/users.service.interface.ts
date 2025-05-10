import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

// В Сервис приходят DTO, например UserRegisterDto или UserLoginDto
// Методы сервиса обычно возвращают Entity, null или boolean
export interface IUserService {
  // При успешном создании возвращается User Entity
  // null возвращается если такой пользователь уже есть
  createUser: (dto: UserRegisterDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
