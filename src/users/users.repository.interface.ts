import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
  // Создание пользователя
  // Входной параметр - User Entity, Результат - модель Prisma из БД
  create: (user: User) => Promise<UserModel>;

  // Поиск пользователя по email (уникальное значение)
  // Результат - модель Prisma из БД или null если ничего не найдено
  // Лучше использовать null, а не генерировать ошибки
  // Проверку на null проще выполнить, получаем простой линейный код
  find: (email: string) => Promise<UserModel | null>;
}
