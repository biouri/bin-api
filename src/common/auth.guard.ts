import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class AuthGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    // Нужно проверить наличие в Request user
    if (req.user) {
      return next(); // все хорошо, мы пропускаем дальше
    }
    res.status(401).send({ error: 'Вы не авторизованы' });
  }
}
