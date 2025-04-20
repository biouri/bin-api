import express from 'express';

const port = 8000;
// Создание приложения Express = вызов функции express()
const app = express();

// В рамках приложения можно создавать Маршруты
// Для обработки запроса применяется callback функция с request, response
app.get('/hello', (req, res) => {
	res.send('Привет!');
});

// Создание сервера
// Приложение прослушивает запросы на port в бесконечном цикле
app.listen(port, () => {
	console.log(`Сервер Express запущен на http://localhost:${port}`);
});
