# BIN-API

## Git

1. Инициализация репозитория Git в проекте.
2. Добавление изменений и выполнение первого коммита.
3. Переименование основной ветки в main.
4. Подключение внешнего репозитория origin.
5. Отправить во внешний репозиторий origin ветку main.

```bash
git init
git add .
git commit -m "Create NodeJS BIN-API with README.md + package.json + Simple HTTP Server"
git branch -M main
git remote add origin https://github.com/biouri/bin-api.git
git push -u origin main
```

## 1.1 Простой http сервер

Базовое создание сервера.
Использование фреймворков для rest API.

### Создание нового npm проекта

```shell
npm init
```

### Выбор настроек проекта (версия, entry point, лицензия).

Для использования модулей ES6 необходимо добавить: `"type": "module"`, поскольку проект начинаем разрабатывать на JavaScript, в дальнейшем будем использовать TypeScript типизацию и tsconfig.json.

`bin-api\package.json`

```json
{
  "name": "bin-api",
  "version": "1.0.0",
  "description": "API for Testing NodeJS",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Yury Belokhonov",
  "license": "ISC"
}
```

### Установка основ:

Импорт библиотеки http из стандартной библиотеки Node.js.
Настройка хоста (`localhost`) и порта (`8000`).

### Создание и запуск сервера:

Использование `http.createServer()` для создания объекта сервера.
Объект сервера принимает функцию-обработчик запросов с аргументами `request` и `response`.

Запуск сервера на определенном порту с выводом сообщения о запуске.

### Обработка запросов:

- Пример отправки простого текстового ответа "Привет" на каждый запрос.
- Настройка статуса ответа и заголовков.

`index.js`

```javascript
import http from "http";

const host = "127.0.0.1";
const port = 8000;

// В createServer передается функция слушатель запросов
const server = http.createServer((req, res) => {
  // Обработка запроса и генерация ответа
  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/hello":
          // Устанавливаем параметры для ответа
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          // Ответить (после установки параметров)
          res.end("Привет!");
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
```

## curl tests

```bash
curl http://127.0.0.1:8000/hello
curl -X GET http://127.0.0.1:8000/hello
curl -i -X GET http://127.0.0.1:8000/hello
curl -I -X GET http://127.0.0.1:8000/hello
```

### Полезные ключи curl

```text
Ключ / Что делает
-i  Показывает заголовки ответа (вместе с телом)
-v  Включает подробный лог (debug — показывает и запрос, и ответ)
-X  GET	Явно указывает HTTP-метод (GET, POST, PUT и т.д.)
-H  "Header: X"	Добавляет свой HTTP-заголовок
-d  "key=value"	Передаёт данные запроса (обычно для POST или PUT)
-o  file.txt	Сохраняет тело ответа в файл
-L  Следует за редиректами (HTTP 3xx)
-s  Тихий режим — без прогресс-бара и лишнего вывода
-u  user:pass	Basic Auth
-I, --head Show document info only
```

Пример запроса:

```shell
curl -i -X GET http://127.0.0.1:8000/hello
```

Пример ответа:

```text
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Sat, 19 Apr 2025 18:41:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 13

Привет!
```

### Примеры использования curl

#### POST-запрос с JSON

```bash
curl -X POST http://localhost:8000/api -H "Content-Type: application/json" -d '{"name": "Test"}'
```

#### Подробный лог запроса/ответа:

```bash
curl -v http://localhost:8000/hello
```

### Проблематика масштабирования http.createServer:

Сложность ручного управления многочисленными маршрутами и методами (необходимость использования условий `if` или `switch`).
Для rest API обычно используются фреймворки, которые упрощают управление маршрутами и методами, например, Express.js.
