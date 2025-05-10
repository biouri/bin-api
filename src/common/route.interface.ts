import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middleware.interface';

// Роут контроллера
export interface IControllerRoute {
  path: string;
  // Стандартная функция Express
  func: (req: Request, res: Response, next: NextFunction) => void;
  // Перечисляем все допустимые методы
  // Pick - это утилитарный тип, который берет из интерфейса значения
  // и создает из них новый интерфейс:
  // из Router берем только 'get' | 'post' | 'delete' | 'patch' | 'put'
  // keyof используется чтобы из интерфейса Pick<...> получить ключи
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  // Возможна запись ниже, но без гарантии соответствия возможным методам
  // method: 'get' | 'post' | 'delete' | 'patch' | 'put';
  // Массив необязательных обработчиков, передают управление в next
  middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
