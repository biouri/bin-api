import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
  // secret - строка, которой шифруется и дешифруется JWT
  constructor(private secret: string) {}

  // Авторизационный Middleware будет включен на глобальном уровне
  // Работает для всех запросов
  // Но если в заголовке нет данных авторизации, выполнение переходит далее next()
  execute(req: Request, res: Response, next: NextFunction): void {
    // Данные авторизации в находятся в заголовке который состоиз из 2-х частей
    // Bearer JWT...
    if (req.headers.authorization) {
      // Убираем слово Bearer и оставляем только строку JWT
      // Затем проверяем методом verify из библиотеки jsonwebtoken
      // используем секретный ключ для дешифрования payload
      // this.secret будет предварительно задан через конструктор
      // Третий параметр (err, payload) ... - стрелочная функция при завершении
      verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
        if (err) {
          next(); // Ничего не делаем
        } else if (payload && typeof payload === 'object' && 'email' in payload) {
          // В типе Request из Express нет пользователя, его нужно добавить
          // Необходимо использовать типы d.ts которые позволяют дополнить типы,
          // либо определить свои типы, либо типизировать библиотеку если
          // если библиотека не типизирована
          // Дополняем namespace Express в файле types/custom.d.ts
          req.user = payload.email; // Добавим в Request пользователя
          next();
        }
      });
    }
    next();
  }
}
