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
import { UserService } from './users.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken'; // Функция для подписи JWT
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './users.service.interface';

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
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    super(loggerService);
    // Контроллер принимает дополнительный ValidateMiddleware
    // ValidateMiddleware вызывает валидацию от класса UserRegisterDto
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)]
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)]
      },
      {
        path: '/info',
        method: 'get',
        func: this.info,
        middlewares: []
      }
    ]);
  }

  // Третий параметр в Request<{}, {}, UserLoginDto> является ReqBody
  // ReqBody - это данные которые будут приходить методом POST UserLoginDto
  // в качестве body будем использовать DTO объект
  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
    // next(new HTTPError(401, 'ошибка авторизации', 'login'));

    // Валидация пользователя по паролю
    const result = await this.userService.validateUser(req.body);
    // Если валидация по паролю не пройдена
    if (!result) {
      return next(new HTTPError(401, 'ошибка авторизации', 'login'));
    }
    // Если валидация по паролю успешна, возвращаем пустой body
    // this.ok(res, {});
    // Если валидация по паролю успешна, возвращаем JWT
    // JWT подписывается секретным ключом, который читаем из .env
    const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
    this.ok(res, { jwt });
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

  // Пример использования User Service при регистрации пользователя
  // Деструктурируем только { body } из Request чтобы далее не писать req.body.
  // Хорошая практика, если не используется более одного свойства из req.
  // В данном методе body является DTO объектом UserRegisterDto
  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Контроллер отвечает за роутинг и входные/выходные данные
    // Сервис отвечает за бизнес-логику

    // Последовательность действия в методе контроллера:
    // 1. Получить входные данные
    // 2. Преобразовать входные данные
    // 3. Воспользваться сервисом для бизнес-операций
    // 4. Преобразовать результирующие данные полученные от Сервиса
    // 5. Отправить результирующие данные в ответ

    // Создание пользователя User Entity выполняется в сервисе
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует'));
    }
    // Можем выполнить дополнительные преобразование результата для отправки
    // В данном случае отправлять будем email + id
    // id чтобы проверить результат сохранения в БД
    this.ok(res, { email: result.email, id: result.id });
  }

  async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    // Если выполнен запрос с валидным токеном, Request будет содержать информацию user
    // В случае валидного токена авторизации получим в ответе email: user
    this.ok(res, { email: user });
  }

  // SECRET будем хранить в .env файле
  private signJWT(email: string, secret: string): Promise<string> {
    // Оборачиваем callback-функцию sign в Promise
    return new Promise<string>((resolve, reject) => {
      // Параметры функции sign
      // 1. Payload: email + Issued at (когда выпущен)
      //    Рекомендуется всегда добавлять время выпуска,
      //    иначе всегда будет одинаковый токен независимо от времени выпуска.
      //    Нормальная практика использовать два токена JWT и Refresh.
      //    JWT токен имеет ограниченное время жизни, затем его обновляют
      //    Для обновления JWT отправляется Refresh токен и
      //    в ответ получаем Новый JWT + Новый Refresh
      //    Такая цепочка гарантирует стойкость при компроментации JWT.
      //    При утере токена злоумышленник сможет воспользоваться им только
      //    определенный период времени, до момента обновления.
      // 2. Secret
      // 3. Дополнительные опции: алгоритм и др.
      // 4. Функция-callback выполнится при ошибке или успешном формировании JWT
      //    (err, token) => { ... }
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000)
        },
        secret,
        {
          algorithm: 'HS256'
        },
        (err, token) => {
          if (err) {
            reject(err); // ошибка
          }
          // token может быть undefined если возникла ошибка.
          // Если ошибки нет, токен всегда будет string
          // Т.к. token может быть string | undefined, используем явное приведение типа
          // Приведение типа необходимо т.к. функция signJWT возвращает Promise<string>
          resolve(token as string);
        }
      );
    });
  }
}
