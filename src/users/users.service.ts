import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

// Сервис может работать только с репозиторием
@injectable()
export class UserService implements IUserService {
  // Подключение конфигурационного .env
  // Подключение репозитория
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
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
    // Используем соль из конфигурации .env
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));

    // проверка что он есть?
    // если есть - возвращаем null
    // если нет - создаём
    const existedUser = await this.usersRepository.find(email);
    if (existedUser) {
      return null; // пользователь уже есть в БД
    }
    // Создание пользователя в БД с хешированным паролем
    return this.usersRepository.create(newUser);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    // Поиск пользователя в БД
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) {
      return false; // Нет такого пользователя
    }
    // Конструируем пользователя
    // Модель из БД необходимо преобразовать в Entity-сущности
    // Чтобы не использовать конструкторы с большим количеством параметров
    // рекомендуется использовать Mapper для преобразования моделей в сущности
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    // Проверяем совпадение пароля - это результат валидации пароля
    return newUser.comparePassword(password);
  }

  // Получение информации о пользователе по уникальному идентификатору: email
  // В результата получим пользователя или null (если его нет в БД)
  // Метод не обязательно используется для авторизованных пользователей
  async getUserInfo(email: string): Promise<UserModel | null> {
    return this.usersRepository.find(email);
  }
}
