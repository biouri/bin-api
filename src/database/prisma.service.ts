import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

// UserModel - это модель, сгенерированная Prisma в generated/prisma
// UserModel не имеет каких-либо методов, это чистая модель для данных

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  // Подключение к БД
  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] Успешно подключились к базе данных');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error('[PrismaService] Ошибка подключения к базе данных: ' + e.message);
      }
    }
  }

  // Отключение от БД
  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
