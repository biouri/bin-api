import { NextFunction, Request, Response } from 'express';

// Общий интерфейс для всех фильтров в приложении содержит метод catch
export interface IExceptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
