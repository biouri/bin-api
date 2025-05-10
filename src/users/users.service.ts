import 'reflect-metadata';
import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';

// Сервис может работать только с репозиторием
@injectable()
export class UserService implements IUserService {
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    // Бизнес-логика создания пользователя

    // Создание пользователя User Entity выполняется в две строки
    // 1. Применяется конструктор без пароля
    // 2. Устанавливается Хеш пароля при помощи асинхронного метода setPassword
    // Такой код лучше изменить и использовать фабричные методы создания User
    // Также создание объекта User необходимо выполнять в сервисе
    // Почему не стоит использовать setter для пароля:
    // Возможен баг: объект создан без пароля, можно забыть вызвать setPassword!
    // Нарушена консистентность: у объекта может быть "дырявое" состояние.
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    // проверка что он есть?
    // если есть - возвращаем null
    // если нет - создаём
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
