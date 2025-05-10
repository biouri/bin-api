import 'reflect-metadata';
import { App } from './app';
import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { IUserController } from './users/users.controller.interface';
import { UserController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import { TYPES } from './types';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

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

// Отдельный модуль
// ContainerModule используется чтобы собрать приложение из разных модулей
// Сбор/Объединение набора зависимостей в модуль (собираем первый модуль)
// Если приложение будет разростаться, можно разделить модуль на части

// Вариант рабочего кода для Inversify v7+

// export const appBindings = new ContainerModule(
// 	(options: ContainerModuleLoadOptions) => {
// 		// Интерфейс IService... биндится на конкретную реализацию Service...
// 		// Интерфейс ILogger биндится на конкретную реализацию LoggerService
// 		options.bind<ILogger>(TYPES.ILogger).to(LoggerService);
// 		options.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
// 		// Не обязательно создавать интерфейсы для каждой реализацияи
// 		// Есть одна конкретная реализация UserController без использования интерфейса
// 		options.bind<UserController>(TYPES.UserController).to(UserController);
// 		options.bind<App>(TYPES.Application).to(App);
// });

// В Inversify v7+ ContainerModule ожидает
// объект ContainerModuleLoadOptions в виде параметра:

// interface ContainerModuleLoadOptions {
//   bind: Bind;
//   unbind: Unbind;
//   isBound: IsBound;
//   rebind: Rebind;
// }

// Отдельный модуль
// ContainerModule используется чтобы собрать приложение из разных модулей
// Сбор/Объединение набора зависимостей в модуль (собираем первый модуль)
// Если приложение будет разростаться, можно разделить модуль на части

// Вариант рабочего кода для Inversify v7+

export const appBindings = new ContainerModule(({ bind }) => {
  // Интерфейс IService... биндится на конкретную реализацию Service...
  // Интерфейс ILogger биндится на конкретную реализацию LoggerService
  // Теперь по токену TYPES.ILogger можно применить @inject для внедрения LoggerService
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  // Не обязательно создавать интерфейсы для каждой реализацияи
  // Есть одна конкретная реализация UserController без использования интерфейса
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  // DI с контейнером inversify
  // Контейнер - место хранения биндингов символов типов на конкретные реализации
  const appContainer = new Container();
  // Загрузить существующие биндинги которые определили раньше
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  // Точка входа в приложение
  app.init();
  return { appContainer, app };
}

// В дальнейшем понадобятся для тестов экземпляры приложения и контейнера
export const { app, appContainer } = bootstrap();
