# BIN-API

1.1. Простой http сервер
1.2. Переход на Express

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

```bash
git commit -m "Add Express HTTP Server"
```

## 1.1. Простой http сервер

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

## 1.2. Переход на Express

1. Express упрощает работу с HTTP-запросами (GET, POST и т.д.) благодаря добавлению дополнительного слоя абстракции.
2. Позволяет использовать промежуточные обработчики для, например, авторизации пользователей.

### Установка Express

1. Установка

```shell
npm i express
```

`package.json`

```json
  "dependencies": {
    "express": "^5.1.0"
  }
```

2. Импортирование и создание приложения:
   Импортируем Express.
   Создаем экземпляр приложения с помощью вызова функции Express.

### Настройка сервера и роутов

1. Настройка прослушивания порта:
   Используем метод `app.listen()` для начала прослушивания HTTP-запросов на определенном порту.
2. Добавление роута:
   Пример с роутом, обрабатывающим GET-запрос по адресу `/hello` и отправляющим ответ "Привет".

```javascript
import express from "express";

const port = 8000;
// Создание приложения Express = вызов функции express()
const app = express();

// В рамках приложения можно создавать Маршруты
// Для обработки запроса применяется callback функция с request, response
app.get("/hello", (req, res) => {
  res.send("Привет!");
});

// Создание сервера
// Приложение прослушивает запросы на port в бесконечном цикле
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
```

### Запуск и проверка работы

1. Запуск приложения:
   Скрипт `start` в `package.json` для упрощения запуска приложения.

```json
  "scripts": {
    "start": "node index.js"
  }
  ...
```

Запуск приложения:

```shell
npm start
```

2. Проверка работы приложения:
   Используем HTTP-клиент (например, Insomnia или curl) для тестирования ответа от созданного роута.

```bash
curl -i -X GET http://127.0.0.1:8000/hello
```

### Аналоги curl в командной строке (CLI):

1. HTTPie
   🔹 Более "человеко-читаемый" и дружелюбный к пользователю.

```bash
http GET http://localhost:8000
```

✅ Автоматически форматирует JSON
✅ Поддерживает цветной вывод
✅ Поддерживает интерактивные формы, авторизацию, сессии и т.д.

https://httpie.io/cli

2. wget
   🔹 Больше для загрузки файлов, но можно использовать для HTTP-запросов.

```bash
wget --method=POST --body-data='{"name":"Test"}' \
     --header="Content-Type: application/json" \
     http://localhost:8000/api
```

✅ Кроссплатформенный
✅ Может сохранять загруженные файлы

3. Restish
   🔹 CLI-инструмент, ориентированный на REST API.

```bash
restish https://api.example.com/users
```

✅ Поддержка токенов, шаблонов и форматов вывода

https://rest.sh

### Аналоги curl с Web-интерфейсом (GUI):

1. Postman
   🔹 Один из самых популярных инструментов для API-запросов.

✅ Поддержка авторизации, коллекций, тестов
✅ Возможность сохранять и экспортировать запросы
✅ Расширения для командной строки и CI/CD

https://www.postman.com

2. Insomnia
   🔹 Очень удобный GUI для REST и GraphQL.

✅ Поддержка шаблонов, сред и скриптов
✅ Импорт из curl/Postman

https://insomnia.rest

3. Hoppscotch (ранее Postwoman)
   🔹 Лёгкий и быстрый веб-интерфейс прямо в браузере.

✅ Поддержка REST, GraphQL, WebSocket
✅ Открытый исходный код
✅ Быстрый и минималистичный

https://hoppscotch.io
