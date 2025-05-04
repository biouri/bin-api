import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

// Точка сбора всех зависимостей - Composition Root
async function bootstrap() {
	// Внедрение Зависимостей (Dependency Injection, DI)
	// Внедряем в App через конструктор зависимость от другого сервиса
	// В данном месте можно легко подменить реализацию LoggerService()
	const logger = new LoggerService();
	// Создание приложения с тремя зависимостями
	// 1. new LoggerService()
	// 2. new UserController(logger)
	// 3. new ExceptionFilter(logger)
	const app = new App(
		logger, 
		new UserController(logger),
		new ExceptionFilter(logger)
	);
	await app.init(); // Инициализация приложения
}

// Точка входа в приложение
bootstrap();
