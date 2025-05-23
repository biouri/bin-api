import { Response, Router } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IControllerRoute, ExpressReturnType } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
export { Router } from 'express';

// Если потомки @injectable, базовый класс также должен быть @injectable
@injectable()
export abstract class BaseController {
  private readonly _router: Router; // Доступ только через getter

  // В конструктор необходимо явно передать LoggerService
  // Logger используется чтобы показать что выполена инициализация
  constructor(private logger: ILogger) {
    // Внутри Express есть Router() который позволяет создать инстанс
    // роутера для отдельного контроллера
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): ExpressReturnType {
    return res.sendStatus(201);
  }

  // bindRoutes() принимает массив роутов
  // и связывает их с функциями в контроллере
  // protected т.к. мы можем вызывать из наследников
  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      // Логгируем все биндинги, для тестирования
      this.logger.log(`[${route.method}] ${route.path}`);
      // Чтобы не терять контекст выполнения функции
      // Сохраненяем контекст this и связываем с функцией
      // В данном случае это контекст контроллера
      const middleware = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      // При наличии middleware отработать сначала их.
      // Порядок middleware определяется порядком в массиве.
      // Если middleware отсутствует, используется только хендлер.
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }

  // Приблизительный Шаблон bindRoutes
  // Вместо any нужно использовать типизацию
  // protected bindRoutesTemplate(routes: any[]) {
  // 	// В цикле пройти по всем роутам и выполнить
  // 	this.router.get('path', func);
  // }
}
