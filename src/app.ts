import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';

export class App {
	app: Express; // Интерфейс приложения Express
	server: Server; // Используется стандартный 'node:http'
	port: number; // Порт может быть конфигурируемым

    // Реализация конструктора для будущих зависимостей
	constructor() {
		this.app = express(); // Создание экземпляра Express
		this.port = 8000; // Порт по умолчанию 8000
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
        // В данном месте будет добавлен Logger
		console.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
