import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

// С точки зрения разделения ответственности UsersRepository должен работать
// только с моделью UserModel.

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  // Входные параметры можно деструктурировать для удобства
  async create({ email, password, name }: User): Promise<UserModel> {
    // prismaService.client. содержит методы для сгенерированных моделей
    // userModel - доступна после генерации из Prisma нотации prisma\schema.prisma
    // userModel содержит набор методов для создания/удаления/поиска... user
    return this.prismaService.client.userModel.create({
      data: {
        email,
        password,
        name
      }
    });
  }

  // Пример реализации метода Find с проверкой на уникальность e-mail
  async find(email: string): Promise<UserModel | null> {
    // prismaService.client. содержит методы для сгенерированных моделей
    // userModel - доступна после генерации из Prisma нотации prisma\schema.prisma
    // userModel содержит набор методов для создания/удаления/поиска... user
    return this.prismaService.client.userModel.findFirst({
      where: {
        email
      }
    });
  }
}
