import { App } from './app';

async function bootstrap() {
	const app = new App(); // Создание приложения
	await app.init(); // Инициализация приложения
}

// Точка входа в приложение
bootstrap();
