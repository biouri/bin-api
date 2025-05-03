import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { HTTPError } from '../errors/http-error.class';

export class UserController extends BaseController {
	constructor(
		logger: LoggerService
	) {
		super(logger);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		// res используется для передачи контекста
		// ok утилитарный метод базового контроллера
		// this.ok(res, 'Login...');
		
		// Вместо ответа
		// Пример тестирования обработки ошибки
		// В любом месте контроллера можно вызвать next 
		// Передаем ошибку с определенным кодом в Exception Filter
		// Кастомная ошибка HTTPError содержит код, сообщение и контекст
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction) {
		// res используется для передачи контекста
		// ok утилитарный метод базового контроллера
		this.ok(res, 'Register...');
	}
}
