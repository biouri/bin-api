import { App } from './app';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
	// Внедрение Зависимостей (Dependency Injection, DI)
	// Внедряем в App через конструктор зависимость от другого сервиса
	// В данном месте можно легко подменить реализацию LoggerService()
	const app = new App(new LoggerService()); // Создание приложения
	await app.init(); // Инициализация приложения
}

// Точка входа в приложение
bootstrap();
