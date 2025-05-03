import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';

async function bootstrap() {
	// Внедрение Зависимостей (Dependency Injection, DI)
	// Внедряем в App через конструктор зависимость от другого сервиса
	// В данном месте можно легко подменить реализацию LoggerService()
	const logger = new LoggerService();
	// Создание приложения с двумя зависимостями
	// 1. new LoggerService()
	// 2. new UserController(logger)
	const app = new App(logger, new UserController(logger));
	await app.init(); // Инициализация приложения
}

// Точка входа в приложение
bootstrap();
