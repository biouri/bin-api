import { NextFunction, Request, Response } from 'express';

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  // Дополняем интерфейс методом для получения информации о пользователе
  info: (req: Request, res: Response, next: NextFunction) => void;
}
