import { App } from './app';
import { Container } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { TYPES } from './types';

/*
// DI без использования контейнера inversify
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
*/

// DI с контейнером inversify
// Контейнер - место хранения биндингов символов типов на конкретные реализации
const appContainer = new Container();

// Сбор всех зависимостей в контейнер (собираем контейнер)
// Интерфейс IService... биндится на конкретную реализацию Service...
// Интерфейс ILogger биндится на конкретную реализацию LoggerService
// Теперь по токену TYPES.ILogger можно применить @inject для внедрения LoggerService
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
// Не обязательно создавать интерфейсы для каждой реализация
// Есть одна конкретная реализация UserController без использования интерфейса
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
// Точка входа в приложение
app.init();

// В дальнейшем понадобятся для тестов экземпляры приложения и контейнера
export { app, appContainer };
