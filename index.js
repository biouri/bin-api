import http from 'http';

const host = '127.0.0.1';
const port = 8000;

// В createServer передается функция слушатель запросов
const server = http.createServer((req, res) => {
	// Обработка запроса и генерация ответа
	switch (req.method) {
		case 'GET':
			switch (req.url) {
				case '/hello':
					// Устанавливаем параметры для ответа
					res.statusCode = 200;
					res.setHeader('Content-Type', 'text/plain');
					// Ответить (после установки параметров)
					res.end('Привет!');
					break;
			}
			break;
	}
});

// Обработчик слушает запросы в цикле
// Третий параметр - функция, которая выполнится после запуска сервера
server.listen(port, host, () => {
	console.log(`Сервер запущен на ${host}:${port}`);
});
