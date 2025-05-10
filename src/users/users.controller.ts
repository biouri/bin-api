import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

// Временные импорты для экспериментов с производительностью
// import fs from 'fs';
// import { resolve } from 'path';

// Будем использовать для экспериметров перерасхода памяти
// const data = [];

// Временные объекты пользователей для экспериментов с памятью
// class User {}
// const users = [];

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

  // Третий параметр в Request<{}, {}, UserLoginDto> является ReqBody
  // ReqBody - это данные которые будут приходить методом POST UserLoginDto
  // в качестве body будем использовать DTO объект
  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    // Для JSON используется body-parser, он парсит UserLoginDto в req.body
    console.log(req.body); // body будет UserLoginDto
    // req.body является UserLoginDto и его можно использоват далее как объект

    // res используется для передачи контекста
    // ok утилитарный метод базового контроллера
    // this.ok(res, 'Login...');

    console.log('. Точка отладки .');
    // Для эксперимета `Поиск утечек` засоряем память пустыми объектами User()
    // users.push(new User());
    // Вместо ответа
    // Пример тестирования обработки ошибки
    // В любом месте контроллера можно вызвать next
    // Передаем ошибку с определенным кодом в Exception Filter
    // Кастомная ошибка HTTPError содержит код, сообщение и контекст
    next(new HTTPError(401, 'ошибка авторизации', 'login'));
  }

  /*
  // Третий параметр в Request<{}, {}, UserRegisterDto> является ReqBody
  // ReqBody - это данные которые будут приходить методом POST UserRegisterDto
  // в качестве body будем использовать DTO объект
  register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
    // Для JSON используется body-parser, он парсит UserRegisterDto в req.body
    console.log(req.body); // body будет UserRegisterDto
    // req.body является UserRegisterDto и его можно использоват далее как объект

    // Эксперимент для тестирования производительности
    // Синхронно читаем файл и блокируем Event Loop
    // __dirname является текущим каталогом, где находится файл
    // data.push() используется чтобы израсходовать большой объем памяти
    // Идеально плохой код для тестирования
    // data.push(fs.readFileSync(resolve(__dirname, '../../Auf_dem_Markt.mp4')));

    // res используется для передачи контекста
    // ok утилитарный метод базового контроллера
    this.ok(res, 'Register...');
  }
  */

  // Пример использования User Entity при регистрации пользователя
  // Деструктурируем только { body } из Request чтобы далее не писать req.body.
  // Хорошая практика, если не используется более одного свойства из req.
  // В данном методе body является DTO объектом UserRegisterDto
  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Создание пользователя User Entity выполняется в две строки
    // 1. Применяется конструктор без пароля
    // 2. Устанавливается Хеш пароля при помощи асинхронного метода setPassword
    // Такой код лучше изменить и использовать фабричные методы создания User
    // Также создание объекта User необходимо выполнять в сервисе
    // Почему не стоит использовать setter для пароля:
    // Возможен баг: объект создан без пароля, можно забыть вызвать setPassword!
    // Нарушена консистентность: у объекта может быть "дырявое" состояние.
    const newUser = new User(body.email, body.name);
    await newUser.setPassword(body.password); // можно забыть вызвать!
    // В качестве тестового ответа возвращаем созданный объект пользователя
    this.ok(res, newUser);
  }
}
