import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { IUserController } from './users/users.controller.interface';
import { UserController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { json } from 'body-parser'; // Middleware для разбора JSON
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
  app: Express; // Интерфейс приложения Express
  server: Server; // Используется стандартный 'node:http'
  port: number; // Порт может быть конфигурируемым
  // logger: LoggerService; // Зависимость - конкретная реализация
  // logger: ILogger; // Зависимость должна удовлетворять контракту/интерфейсу
  // userController: UserController; // Как зависимость
  // exceptionFilter: ExceptionFilter; // Как зависимость

  // Реализация конструктора для будущих зависимостей
  constructor(
    // logger: LoggerService, // Конкретная реализация
    // logger: ILogger, // Используем интрефейс вместо конкретной реализации
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {
    this.app = express(); // Создание экземпляра Express
    this.port = 8000; // Порт по умолчанию 8000

    // Не рекомендуется создавать инстанс в данном конструкторе поскольку
    // мы будем привязаны к единственному LoggerService() и это
    // не позволит изменить реализацию LoggerService() при тестировании
    // this.logger = new LoggerService();

    // Управление зависимостями полностью перешло к контейнеру inversify
    // Инстанс логгера передается как параметр конструктора
    // Логгер создается снаружи данного класса и внедряется как зависимость
    // this.logger = logger; // Рекомендуется получить инстанс извне как зависимость
    // this.userController = userController; // Получить инстанс извне как зависимость
    // this.exceptionFilter = exceptionFilter; // Получить инстанс извне как зависимость
  }

  // Глобальный парсер BODY в JSON для всех запросов
  // Также можно настроить Middleware для конкретных запросов
  useMiddleware(): void {
    // Приложение (this.app) использует (this.app.use) Middleware
    this.app.use(json()); // Парсер BODY в JSON для всех запросов

    // Внедрение auth.middleware на глобальном уровне в приложение
    const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
    // Теперь во всех запросах Request будет доступно поле user
    // если запрос был выполнен с токеном, иначе поле user будет undefined
  }

  // Метод инициализации Маршрутов Routes
  useRoutes(): void {
    this.app.use('/users', this.userController.router); // Используем контроллер
  }

  // Можеть быть несколько Exception Filters
  useExceptionFilters(): void {
    // Обязательно привязываем контекст фильтра this.exceptionFilter
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  // Инициализация приложения при запуске
  // Это публичный метод, чтобы кто-то мог запустить его
  // App в перспективе можно отделить архитектурно от сервера Express
  // На текущий момент корневой класс App запускает сервер Express
  public async init(): Promise<void> {
    // Запуск в правильном порядке
    // 1. Middleware
    // 2. Routes Маршруты
    // 3. Exception Filters

    // На текущий момент есть Middleware + Инициализация Маршрутов + Exception Filters
    // Важен порядок следования
    this.useMiddleware(); // Глобальный парсер BODY в JSON для всех запросов
    this.useRoutes();
    this.useExceptionFilters();
    // Подключение БД
    await this.prismaService.connect();
    // Создание сервера
    this.server = this.app.listen(this.port);
    // В данном месте будет добавлено логгирование
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }

  public close(): void {
    // Завершить работу сервера
    this.server.close();
  }
}
