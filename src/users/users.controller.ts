import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './users.controller.interface';

// Временные импорты для экспериментов с производительностью
import fs from 'fs';
import { resolve } from 'path';

// Будем использовать для экспериметров перерасхода памяти
const data = [];

// Временные объекты пользователей для экспериментов с памятью
class User {}
const users = [];

// Декоратор @injectable говорит, что UserController можно положить в конейнер
@injectable()
export class UserController extends BaseController implements IUserController {
  // Декоратор @inject принимает ключ TYPES.ILogger для внедрения зависимости
  // Управлять зависимостями будет inversify
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ]);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    // res используется для передачи контекста
    // ok утилитарный метод базового контроллера
    // this.ok(res, 'Login...');

    console.log('. Точка отладки .');
    // Для эксперимета `Поиск утечек` засоряем память пустыми объектами User()
    users.push(new User());
    // Вместо ответа
    // Пример тестирования обработки ошибки
    // В любом месте контроллера можно вызвать next
    // Передаем ошибку с определенным кодом в Exception Filter
    // Кастомная ошибка HTTPError содержит код, сообщение и контекст
    next(new HTTPError(401, 'ошибка авторизации', 'login'));
  }

  register(req: Request, res: Response, next: NextFunction): void {
    // Эксперимент для тестирования производительности
    // Синхронно читаем файл и блокируем Event Loop
    // __dirname является текущим каталогом, где находится файл
    // data.push() используется чтобы израсходовать большой объем памяти
    // Идеально плохой код для тестирования
    data.push(fs.readFileSync(resolve(__dirname, '../../Auf_dem_Markt.mp4')));

    // res используется для передачи контекста
    // ok утилитарный метод базового контроллера
    this.ok(res, 'Register...');
  }
}
