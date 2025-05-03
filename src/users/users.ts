// Файл users.ts больше не используется для основного проекта
// но может быть задействован в тестовом src\index.ts
import express from 'express';

// Создание роутера
const userRouter = express.Router();

// Дополнительный обработчик роутера 
// Будет срабатывать для всех запросов маршрута /users/...
userRouter.use((req, res, next) => {
	console.log('Обработчик users');
	next();
});

userRouter.post('/login', (req, res) => {
	res.send('login');
});

userRouter.post('/register', (req, res) => {
	res.send('register');
});

export { userRouter };
