import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

// Все фильтры для единообразия реализуют общий интерфейс IExceptionFilter
// Чтобы был стандартный метод catch, которым можно что-то обработать

// Декоратор @injectable говорит, что ExceptionFilter можно положить в конейнер
@injectable()
export class ExceptionFilter implements IExceptionFilter {
  // logger: LoggerService;
  // Явное использование зависимости необходимо заменить на @inject
  // constructor(logger: LoggerService) {
  // 	this.logger = logger;
  // }

  // Декоратор @inject принимает ключ TYPES.ILogger для внедрения зависимости
  // Управлять зависимостями будет inversify
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  // Метод catch, который ловит ошибку err: Error | HTTPError
  // HTTPError это расширенный класс от обычной ошибки Error
  // В HTTPError содержится дополнительная информация с кодом ошибки
  // HTTPError передаются из контроллера и более информативны для пользователей
  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      // Логгирование ошибки HTTPError (ошибка имеет контекст и сообщение)
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
      // Ответ пользователю, например 401 - неавторизован, 403 - недостаточно данных
      res.status(err.statusCode).send({ err: err.message });
    } else {
      // Логгирование обычной ошибки (ошибка имеет сообщение)
      this.logger.error(`${err.message}`);
      // Ответ пользователю
      res.status(500).send({ err: err.message });
    }
  }
}
