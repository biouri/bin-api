import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
  // classToValidate - какой класс будем валидировать
  // Сырой body (который является объектом) преобразовать к этому классу
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    // Берем body и преобразовываем в класс того типа,
    // который изначально передавался в конструктор и замем валидируем
    const instance = plainToClass(this.classToValidate, body);
    // validate принимает instance класса и выдает ошибки при наличии
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        // Отправляем массив ошибок со статусом 422: Неверные данные
        // С помощью декораторов можно описать текстовые значения ошибок
        res.status(422).send(errors);
      } else {
        // Нет ошибок: переходим к следующему обработчику
        next();
      }
    });
  }
}
