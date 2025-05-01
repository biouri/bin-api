import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

export class App {
    app: Express; // Интерфейс приложения Express
    server: Server; // Используется стандартный 'node:http'
    port: number; // Порт может быть конфигурируемым
    logger: LoggerService; // Как зависимость

    // Реализация конструктора для будущих зависимостей
	constructor(logger: LoggerService) {
        this.app = express(); // Создание экземпляра Express
        this.port = 8000; // Порт по умолчанию 8000

        // Не рекомендуется создавать инстанс в данном конструкторе поскольку
        // мы будем привязаны к единственному LoggerService() и это
        // не позволит изменить реализацию LoggerService() при тестировании
        // this.logger = new LoggerService();

        // Инстанс логгера передается как параметр конструктора
        // Логгер создается снаружи данного класса и внедряется как зависимость
        this.logger = logger; // Рекомендуется получить инстанс извне как зависимость
	}

    // Метод инициализации Маршрутов Routes
	useRoutes() {
		this.app.use('/users', userRouter);
	}

    // Инициализация приложения при запуске
    // Это публичный метод, чтобы кто-то мог запустить его
    // App в перспективе можно отделить архитектурно от сервера Express
    // На текущий момент корневой класс App запускает сервер Express
	public async init() {
        // Запуск в правильном порядке
        // 1. Middleware (на данном этапе отсутствует)
        // 2. Routes Маршруты
        // 3. Exception Filters (на данном этапе отсутствует)
		
        // На текущий момент есть только Инициализация Маршрутов
        this.useRoutes();
        // Создание сервера
		this.server = this.app.listen(this.port);
        // В данном месте будет добавлено логгирование
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
