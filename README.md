# BIN-API

1.1. Простой http сервер
1.2. Переход на Express
1.3. Маршрутизация
1.4. Ответы клиенту: Headers, Status, Redirect, Location, Cookies
1.5. Router
1.6. Middleware Global Handlers, Route-specific and Error Handlers
2.1. TypeScript
2.2. Установка TypeScript
2.3. Базовые типы
2.4. Union типы
2.5. Interfaces и Types
2.6. Литеральные типы
2.7. Enum
2.8. Generics
2.9. Классы
2.10. Другие типы и возможности
3.1. Обзор архитектуры
3.2. Класс приложения
3.3. Logger
3.4. Базовый класс контроллера BaseController
3.5. Контроллер пользователей UserController
3.6. Обработка ошибок ExceptionFilter
4.1. Разбор DI и IOC
4.2. Декораторы
4.3. Metadata Reflection
4.4. Внедрение InversifyJS
4.5. Улучшение DI
5.1. Eslint и Prettier
5.2. Подключение nodemon
5.3. Отладка - Debugging
5.4. Анализ памяти
5.5. Мониторинг производительности
6.1. Улучшение архитектуры
6.2. Data transfer object
6.3. User entity
6.4. Сервис Users
6.5. Middleware для роутов
6.6. Валидация данных
7.1. Сервис конфигурации
7.2. Работа с Prisma
7.3. Репозиторий Users
7.4. Простая проверка авторизации - Логин пользователя
8.1. Работа JWT
8.2. Создание токена
8.3. Middleware для проверки jwt
8.4. Guard авторизации

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
git commit -m "Add All RegExp Routing + CallBack Chaining"
git commit -m "Add Response Headers, Status, Redirect, Location, Cookies"
git commit -m "Add Router express.Router()"
git commit -m "Add Middleware Global Handlers, Route-specific and Error Handlers"
git commit -m "Add TypeScript and tsconfig.json"
git commit -m "Add Base/Union Types, Aliases, Interfaces, Enums, Generics"
git commit -m "Add Classes, KeyOf, TypeOf, Null, Void, BigInt, Symbol"
git commit -m "Add App Class with Layered Architecture"
git commit -m "Add Logger and Simple Dependency Injection DI"
git commit -m "Add BaseController + UserController"
git commit -m "Add Error Handlers + Exception Filters"
git commit -m "Add Dependency Inversion Principle DIP + Inversion of Control IoC"
git commit -m "Add Decorators"
git commit -m "Add Metadata Reflection"
git commit -m "Add Metadata Reflection Example with Strict Typing testmeta.ts"
git commit -m "Add InversifyJS DI Container + @injectable + @inject"
git commit -m "Add Dependency Injection Improvements"
git commit -m "Add Eslint + Prettier + .vscode/settings.json"
git commit -m "Add Nodemon + TS-node TypeScript for Node.js"
git commit -m "Add Debug Config launch.json + sourceMap in tsconfig.json"
git commit -m "Add Chrome DevTools Memory Analysis + Performance Optimization"
git commit -m "Add ClinicJS Doctor + Autocannon Load Simulator"
git commit -m "Add Architectural Improvements"
git commit -m "Add Data Transfer Object DTO + body-parser Middleware"
git commit -m "Add User Entity + mutable/immutable + consistent/non-consistent"
git commit -m "Add UserService"
git commit -m "Add Middleware Routes + DTO Validator"
git commit -m "Add Config Singleton Service + dotenv + Example .env"
git commit -m "Add ORM Prisma + UsersRepository"
git commit -m "Add Simple User Login Password Validation"
git commit -m "Add JWT + signJWT Method in UserController"
git commit -m "Add JWT Verification Middleware"
git commit -m "Add Authorization Guard"
```

## Дополнительные темы

`Mapper` для преобразования моделей в сущности.

### NPM зависимости

```shell
npm init
npm install -g typescript
npm i express
npm i @types/express -D
npm i tslog
# DI
npm i inversify reflect-metadata
# eslint + prettier
npm i -D eslint
npm i -D @typescript-eslint/parser
npm i -D @typescript-eslint/eslint-plugin
npm i -D prettier
npm i -D eslint-config-prettier
npm i -D eslint-plugin-prettier
npm i -D typescript
# Отладка
npm install -g clinic doctor autocannon
# Автоматическая пересборка/перезапуск
npm i -D nodemon
npm i -D ts-node
# middleware для разбора JSON
npm i body-parser
# Хеширование
npm i bcryptjs
npm i -D @types/bcryptjs
# Декораторы для описания правил валидации
npm i class-validator
npm i class-transformer
# Использование файлов `.env` для управления переменными окружения
npm i dotenv
# ORM
npm i -D prisma
npm i @prisma/client
# JWT
npm i jsonwebtoken
npm i -D @types/jsonwebtoken
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

## 1.3. Маршрутизация

1. Обработка различных типов запросов:
   Express позволяет обрабатывать различные типы HTTP-запросов через специальные методы, такие как `GET`, `POST`, `DELETE`, `PUT`, и `PATCH`. Каждый из этих методов принимает коллбэк функцию с параметрами `REQUEST` и `RESPONSE` для обработки запросов.

2. Использование `ALL` для обработки всех типов запросов:
   Метод `ALL` позволяет добавить middleware, который будет обрабатывать все типы запросов. Он полезен для выполнения кода перед основными обработчиками запросов.

### Порядок обработки маршрутов

Порядок размещения маршрутов в коде определяет порядок их обработки. Если маршрут с использованием метода `ALL` размещен до основного обработчика запроса, он будет выполнен первым. Этот порядок важен, так как он определяет, какие миддлвары или обработчики будут вызваны и в какой последовательности.

### Расширенные возможности маршрутизации

1. `Динамические роуты`:
   Express поддерживает использование паттернов в маршрутах, таких как `?`, `+`, и `*`, для создания динамических маршрутов, которые могут совпадать с различными путями URL.

2. `RegExp в маршрутизации`:
   Для более сложных случаев можно использовать регулярные выражения, чтобы точно указать, какие пути должны совпадать с маршрутом.

### Продвинутые техники маршрутизации

1. `Использование нескольких коллбэков`:
   Express позволяет указать несколько коллбэков для обработки маршрута, что позволяет разделить логику обработки на несколько частей или добавить дополнительные миддлвары.

2. `Группирование маршрутов`:
   Express предоставляет удобные методы для группирования маршрутов, связанных с одной сущностью или API, что упрощает структурирование кода и повышает читаемость.

```javascript
import express from 'express';

const port = 8000;
// Создание приложения Express = вызов функции express()
const app = express();

// В рамках приложения можно создавать Маршруты

// Порядок добавления маршрутов соответствует последовательности обработки
// Middleware для обработки всех типов запросов
// Для обработки любого запроса применяется all в которой есть параметр next
// Это промежуточный обработчик внедренный перед маршрутом нужного типа
app.all('/hello', (req, res, next) => {
  console.log('All');
  // Если вызывается next(), то
  // обработка запроса передается дальше на GET, POST... обработчик
  next();
});

// Дополнительный CallBack
const cb = (req, res, next) => {
  console.log('Extra CallBack');
  next();
};

// Дополнительный CallBack 2
const cb2 = (req, res, next) => {
  console.log('Extra CallBack 2');
  next();
};

// Раньше '/h?ello' работало для маршрутов /hello и /ello
// В Express старые версии path-to-regexp допускали символ ? в маршрутах как часть строки.
// Начиная с более строгих версий (v6+), требуется: точная регулярка.
// Что изменилось в новых версиях path-to-regexp (v6+):
// Более строгий синтаксис маршрутов.
// Запрещены или по-другому интерпретируются конструкции вроде ? вне параметров (:param?).
// Все символы вне параметров и групп должны быть валидными для RegExp, или будут выброшены ошибки.

// Знак ? (вопроса) обозначает "необязательный символ"
// Знак + (плюс) обозначает "любое число повторений символа"
// Знак * (звездочка) обозначает "ноль или более повторений символа"
// Что здесь происходит /^\/h*ello$/:
//   ^ — начало строки (то есть маршрут должен начинаться с /).
//   \/ — экранированный слэш /.
//   h* — ноль или более символов h.
//   ello — буквально ello.
//   $ — конец строки.

// Использование нескольких коллбэков
// Например, для маршрута /hello будут последовательно срабатывать
// 1. app.all('/hello', (req, res, next) ... )
// 2. Дополнительный CallBack cb
// 3. Обработчик ниже app.get(/^\/h*ello$/, cb, (req, res) ... )
// Можно также последовательно выполнить массив из CallBack обработчиков
// app.get(/^\/h*ello$/, [cb, cb2, (req, res) => { ... }]);
app.get(/^\/h*ello$/, cb, cb2, (req, res) => {
  console.log('GET /h*ello');
  res.send('Привет! GET /hello');
});

// Группирование маршрутов
// Для обработки каждого запроса применяется callback функция с request, response
app
  .route('/user')
  .get((req, res) => {
    console.log('GET /user');
    res.send('Get User! GET /user');
  })
  .post((req, res) => {
    console.log('POST /user');
    res.send('Add User! POST /user');
  })
  .put((req, res) => {
    console.log('PUT /user');
    res.send('Update User! PUT /user');
  });

// Создание сервера
// Приложение прослушивает запросы на port в бесконечном цикле
app.listen(port, () => {
  console.log(`Сервер Express запущен на http://localhost:${port}`);
});
```

## 1.4. Ответы клиенту

### Ответы сервера:

1. Отправка текста:
   Примером может служить отправка простого сообщения "Привет".

2. Отправка JSON:

- Можно использовать метод `send` для отправки JSON, например, `{ success: true }`.

```javascript
// Тестирование ответов клиенту
app.get('/test', (req, res) => {
  // JSON
  res.send({ success: true });
});
```

http GET http://localhost:8000/test

```text
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 16
Content-Type: application/json; charset=utf-8
Date: Tue, 22 Apr 2025 09:26:19 GMT
ETag: W/"10-oV4hJxRVSENxc/wX8+mA4/Pe4tA"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "success": true
}
```

- Для работы исключительно с JSON предусмотрен метод `json`.

```javascript
app.get('/test', (req, res) => {
  // Изменнеие статуса и ответ JSON
  res.status(201).json({ success: true, type: 'json' });
});
```

http GET http://localhost:8000/test

```text
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 30
Content-Type: application/json; charset=utf-8
Date: Tue, 22 Apr 2025 10:01:13 GMT
ETag: W/"1e-/Y2Cr8+aC3AlAqjsTMrwE0XXQTM"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "success": true,
    "type": "json"
}
```

- Есть также метод `jsonp` для работы с JSON в контексте `cross-origin` запросов.

3. Управление статусами ответа:
   Можно явно задать статус ответа, например, `201` при создании ресурса.

```javascript
app.get('/test', (req, res) => {
  // Изменнеие статуса и ответ JSON
  res.status(201).send({ success: true });
});
```

http GET http://localhost:8000/test

```text
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 16
Content-Type: application/json; charset=utf-8
...
```

4. Отправка файла:
   Метод `download` позволяет предложить пользователю скачать файл, с возможностью задать имя файла.

```javascript
app.get('/test', (req, res) => {
  // Предложить пользователю скачать файл, с возможностью задать новое имя файла
  res.download('./choco.md', 'optional_filename.txt');
});
```

### Перенаправления:

Редирект: Позволяет перенаправить пользователя на другую страницу или сайт с помощью статуса (например, `301`) и указания URL.

```javascript
app.get('/test', (req, res) => {
  // Перенаправить на другую страницу или сайт с помощью статуса (например, `301`)
  res.redirect(301, 'http://localhost:8000/user');
});
```

http GET http://localhost:8000/test

```text
HTTP/1.1 301 Moved Permanently
Connection: keep-alive
Content-Length: 60
Content-Type: text/plain; charset=utf-8
Date: Tue, 22 Apr 2025 10:31:13 GMT
Keep-Alive: timeout=5
Location: http://localhost:8000/user
Vary: Accept
X-Powered-By: Express

Moved Permanently. Redirecting to http://localhost:8000/user
```

### Работа с заголовками:

1. Добавление и изменение заголовков:

- Метод `set` позволяет добавить или изменить заголовки, например, для явного задания `Content-Type`, `Location` и др.

```javascript
app.get('/test', (req, res) => {
  // Добавить или изменить заголовки
  res.set('Content-Type', 'text/plain');
  res.send('Привет!');
});
```

- Метод `append` добавляет новые заголовки к ответу.

```javascript
app.get('/test', (req, res) => {
  // Добавить заголовки
  res.append('Warning', 'Code');
  res.send('Привет!');
});
```

2. Типы содержимого:
   Можно задавать специфичные типы содержимого ответа, например, HTML или JSON, с помощью метода `type`.

```javascript
app.get('/test', (req, res) => {
  // Задать специфичные типы содержимого ответа, например, HTML или JSON
  res.type('application/json');
  // Аналогично можно установить location, links
  // res.location('...');
  // res.links({
  // 	next: '...'
  // });
  res.send('Привет!');
});
```

### Управление Cookies:

1. Установка cookies:
   Метод `cookie` помогает установить `cookie`, с возможностью задать параметры, такие как `domain`, `path`, `secure`, и `expires`. Cookies передаются с каждым запросом пользователя.

2. Удаление cookies:
   С помощью `clearCookie` можно удалить указанный `cookie`.

```javascript
app.get('/test', (req, res) => {
  // Задать специфичные типы содержимого ответа, например, HTML или JSON
  res.type('application/json');
  // Установка cookie (например, token для авторизации)
  res.cookie('token', 'abcdefgh', {
    domain: '',
    path: '/',
    secure: true,
    expires: new Date(Date.now() + 600000) // 10 минут от текущего времени
  });
  // Пример очистки cookie token (когда пользователь выходит из системы)
  res.clearCookie('token');
  res.send('Привет!');
  // res.end();
});
```

res.cookie() параметр expires должен быть объектом Date.
Альтернатива: использовать maxAge.
Если просто указать "время жизни" cookie в миллисекундах — используется maxAge:

```javascript
res.cookie('token', 'abcdefgh', {
  domain: '',
  path: '/',
  secure: true,
  maxAge: 600000 // 10 минут
});
```

### Обработка запросов без ответа:

Если сервер не отправляет ответ, клиент будет ожидать вечно. Можно использовать метод `send.status()` с последующим `end()` для немедленного завершения обработки.
Крайне желательно, чтобы был выполнен любой метод для ответа res, чтобы route разрезолвился.

```javascript
app.get('/test', (req, res) => {
  // Если нечего возвращать, желательно установить status и завершить обработоку end()
  // Если status не указан, он будет 200
  // res.status(404).end();
  res.end();
});
```

## 1.5. Router

Роутинг позволяет приложению разделить логику обработки запросов по разным адресам, облегчая поддержку и расширение функционала.

### Рост приложения и проблемы монолитной архитектуры

- Проблема масштабирования: Когда приложение растет, добавляется все больше функционала, что приводит к увеличению размера корневого файла.
- Проблемы поддержки и модульности: Все расположение в одном файле затрудняет поддержку и тестируемость отдельных компонентов приложения.

### Решение: Экспресс роутер

1. Декомпозиция приложения:
   Экспресс роутер позволяет разделить приложение на отдельные модули (роуты), каждый из которых отвечает за свою часть логики (например, управление пользователями).

2. Создание роутера:
   Для каждой категории функций (например, пользователи) создается свой файл с роутами в подпапке (например, `Users`).

3. Определение маршрутов:
   В каждом файле роутера можно определить обработку для разных HTTP-методов (GET, POST и т.д.) и путей.

4. Привязка роутера к приложению: С помощью метода `app.use` роутеры привязываются к корневому приложению. Таким образом, запросы пользователей направляются в соответствующий роутер для обработки.

### Практический пример

Показано создание роутера для пользователя (`Users.js`), в котором определены маршруты для логина и регистрации. Привязка данного роутера к основному приложению позволяет обрабатывать запросы к `/users/login` и `/users/register`.

`users\users.js`

```javascript
import express from 'express';

// Создание роутера
const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
  res.send('login');
});

userRouter.post('/register', (req, res) => {
  res.send('register');
});

export { userRouter };
```

`index.js`

```javascript
import { userRouter } from './users/users.js'
...
// Привязка роутера userRouter к корневому роуту '/users' основного приложения
// позволяет обрабатывать запросы к '/users/login' и '/users/register' ...
app.use('/users', userRouter);
```

### Запуск и проверка

Для демонстрации работы роутинга запускается приложение и проверяется обработка запросов на регистрацию и логин пользователя.

http POST http://localhost:8000/users/login

```text
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 5
Content-Type: text/html; charset=utf-8
Date: Wed, 23 Apr 2025 10:12:14 GMT
ETag: W/"5-Jzb6spHwTmm2LUkMPAk2H1uCRho"
Keep-Alive: timeout=5
X-Powered-By: Express

login
```

## 1.6. Промежуточные обработчики

### Middleware

1. Определение:
   Middleware (промежуточные обработчики) позволяют добавлять дополнительную логику обработки к роутам в Express.js.
2. Применение:
   Можно добавлять как к отдельным роутам, так и глобально ко всему приложению.

`users\users.js`

```javascript
// Дополнительный обработчик роутера
// Будет срабатывать для всех запросов маршрута /users/...
userRouter.use((req, res, next) => {
  console.log('Обработчик users');
  next();
});
```

### Глобальное и локальное использование

1. Глобальное использование:
   Пример использования middleware для логирования времени прихода запроса на любой роут.
2. Локальное использование:
   Возможность применения middleware к конкретным роутам для выполнения специфических задач, например, валидации данных.

`index.js`

```javascript
// Глобальный обработчик на все приложение
// Единая точка, где будут логгироваться все входящие запросы
app.use((req, res, next) => {
  console.log('Время: ', Date.now());
  // Обязательно необходимо передать управление дальше
  next();
});

// Локальный обработчик для всех запросов '/hello'
app.use('/hello', (req, res, next) => {
  console.log('Hello время: ', Date.now());
  // Обязательно необходимо передать управление дальше
  next();
});
```

### Обработка ошибок через Middleware

1. Необходимость:
   Обработка ошибок в приложении важна для возвращения пользователям понятных сообщений об ошибках.
2. Методика:
   Создание специального middleware для перехвата и обработки ошибок. Этот обработчик должен быть добавлен в конец списка middleware.
3. Пример:
   Преобразование и логирование ошибок, возвращение клиенту удобочитаемых сообщений, а не полного стека ошибок.

`index.js`

```javascript
...
// Пример маршрута с ошибкой
app.get("/example", (res, req) => {
  throw new Error("Example Error!!!");
});

// Обработчик ошибок должен быть добавлен после всех объявлений app.use
// Можно обработать код ошибки, тип ошибки, модифицировать ответ, напримр json...
// Вместо next() отвечать желательно каким-нибудь статусом, например:
// 401 - неавторизован, 500 - ошибка сервера...
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(401).send(err.message);
});
```

### Принцип работы Middleware в Express.js

1. Порядок выполнения:
   Сначала выполняются глобальные обработчики, затем обработчики, привязанные к конкретным роутам, и в конце - обработчики ошибок.
2. Гибкость:
   Express.js предлагает удобные инструменты для организации маршрутизации и обработки запросов, включая возможность использования встроенных и сторонних middleware.

### Встроенные и сторонние Middleware

1. Использование:
   Express.js позволяет использовать как встроенные (например, для статических файлов), так и сторонние middleware (например, для обработки тела запроса или cookies).
2. Применение:
   Выбор и применение различных middleware зависит от задач, которые предстоит решить в приложении.

## 2.1. TypeScript

https://www.typescriptlang.org/

TypeScript Deep Dive:
https://basarat.gitbook.io/typescript/

TypeScript HandBook:
https://www.typescriptlang.org/docs/handbook/intro.html

TypeScript — надмножество JavaScript, разрабатываемое Microsoft и Open Source сообществом.

- Любой JavaScript код валиден в TypeScript.
- Добавляет типизацию и полезные функции в JavaScript.

### Преимущества TypeScript

1. Типизация:
   Улучшает стабильность и удобство разработки больших приложений.
2. Удобство разработки:
   Предлагает автокомплит для ускорения написания кода.
3. Проверки на этапе разработки:
   Позволяет обнаруживать ошибки до запуска кода.
4. Расширенные возможности:
   Включает интерфейсы, абстрактные классы, Enum и другие улучшения по сравнению с JavaScript.
5. Облегчает архитектуру приложения:
   Упрощает реализацию архитектурных паттернов, таких как Dependency Injection.

Почему TypeScript?

- Используется в крупных фреймворках (NestJS, Angular), и в альтернативах Node.js, например, Deno.
- На пике популярности за счет своих возможностей, хотя и имеет недостатки (например, отсутствие четкой спецификации).
- Особенно важен для разработки больших фронтенд и бэкенд приложений, где типизация критична для стабильности и безопасности.

## 2.2. Установка TypeScript

Проверка, установлен ли TypeScript глобально в системе:

```shell
tsc -v
```

Способ проверки через npm:

```shell
npm list -g typescript
```

Если установлен:

```text
C:\Program Files\nodejs -> .\
└── typescript@5.8.3
```

Если не установлен, будет:

```text
C:\Program Files\nodejs -> .\
└── (empty)
```

Установка через npm:

```shell
npm install -g typescript
```

После установки доступна команда `tsc` (TypeScript Compiler) - компилятор для преобразования TypeScript в JavaScript.

Проверка версии TypeScript

```shell
tsc --version
tsc -v
```

### Настройка TypeScript

1. Инициализация проекта:

```shell
tsc --init
```

создает файл `tsconfig.json` в корне проекта с настройками компилятора.

2. В `tsconfig.json` настраиваем:

- Целевую версию ECMAScript (например, ES6).
- Указываем использование декораторов, если они необходимы для `dependency injection`.

`tsconfig.json`

```json
{
  "compilerOptions": {
    /* Language and Environment */
    // "target": "es2016", // Настройка по умолчанию
    "target": "ES6", // Будем использовать ES6

    // experimentalDecorators будем использовать для DI
    "experimentalDecorators": true,
    // Для того чтобы была возможность эммитить дополнительно метаданные
    "emitDecoratorMetadata": true,

    /* Modules */
    // При компиляции по умолчанию используются модули commonjs
    // "module": "commonjs",
    // Лучше изменить на ES модули
    "module": "ES6",
    // Будем использовать модули node (как TypeScript будет результировать модули)
    // "moduleResolution": "node10",  // Опция по умолчанию
    "moduleResolution": "node",

    /* JavaScript Support */
    // В нашем приложении будет использоваться только TS
    // "allowJs": true,  // Позволяет использовать также JS код
    // "checkJs": true,

    /* Emit */
    // Что и куда будет Emit-иться после команды tsc
    // Сборка будет выполняться в /dist
    "outDir": "./dist",
    // Убрать комментарии
    "removeComments": true,
    // Чтобы можно было импортировать Common модули в ES
    "esModuleInterop": true,

    /* Type Checking */
    // Включить жесткую проверку типов (самые жесткие требования к типизации)
    "strict": true,
    // Далее идет список отдельных опций, которые можно включить/выключить
    // по умолчанию "strict": true включает все эти опции

    // Свойство у класса не обязательно должно быть инициализировано
    // Будем использовать объекты в виде классов, которые описывают данные DTO
    // Данные DTO будут использоваться с декораторами для валидации
    // у DTO нет инициализации свойств, будут использоваться классы как интерфейсы
    "strictPropertyInitialization": false,

    /* Completeness */
    // Проверка сторонних библиотек на корректность типов
    "skipLibCheck": true
  }
}
```

### Переход к TypeScript

1. Переименовываем файлы `.js` в `.ts`.

2. В случае отсутствия типов для библиотек, устанавливаем их с `npm install @types/<library> -D` (например, `@types/express` для Express):

```shell
npm install @types/express -D
```

`package.json`

```json
{
  ...

  "devDependencies": {
    "@types/express": "^5.0.1"
  }
}
```

3. Типизируем параметры функций и переменные там, где TypeScript не может автоматически определить типы. Пример: добавляем типы для параметров в Express middleware.

```javascript
import express, { Request, Response, NextFunction } from 'express';
...
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.message);
	res.status(401).send(err.message);
});
```

4. Компиляция TypeScript в JavaScript выполняется командой `tsc`, результат компиляции обычно находится в директории `dist`.

### Запуск и проверка приложения

1. Запускаем скомпилированный JavaScript с помощью Node.js из директории `dist`.
2. Обновляем `package.json`, указывая путь к основному файлу приложения в `dist`.

`package.json`

```json
{
  ...
  "scripts": {
    "start": "node ./dist/index.js",
  }
  ...
}
```

Запуск теперь выполняется из директории `dist`.

```shell
npm start
```

## 2.3. Базовые типы

### Примитивные типы

1. Числа (Number)
   Автоматическое определение типа переменной как число:

```typescript
let a = 5; // TypeScript автоматически определяет тип number
```

Явное указание типа:

```typescript
let a: number = 5;
```

2. Строки (String)
   Пример объявления строки:

```typescript
let b: string = 'текст';
```

3. Булевы значения (Boolean)
   Определение булевого типа:

```typescript
let isActive: boolean = true;
```

### Type Safety и приведение типов

TypeScript предотвращает присваивание значения неподходящего типа:

```typescript
a = 'текст'; // Ошибка: нельзя присвоить строку переменной типа number
```

Пример автоматического приведения типов (конкатенация строки и числа):

```typescript
let c = a + b; // Результатом будет строка
```

### Массивы и Tuples

1. Массивы
   Объявление массива чисел:

```typescript
let numbers: number[] = [1, 2, 3];
```

2. Tuples (Кортежи)
   Определение и использование tuple:

```typescript
let tuple: [number, string] = [2, 'текст'];
```

### Any

Использование `any` для обозначения любого типа:
Не рекомендуется к использованию из-за отсутствия типовой безопасности:

```typescript
let anything: any = 3;
anything = 'теперь я строка';
anything = true; // Может быть преобразован в любой тип
```

### Функции

Типизация аргументов и возвращаемого значения:
Пример функции, принимающей строку и возвращающей строку:

```typescript
function greet(name: string): string {
  return name + ' привет!';
}
```

### Объектные типы

Объявление типов объектов для более сложных структур:

```typescript
function getCoordinates(): { latitude: number; longitude: number } {
  return { latitude: 34.5, longitude: -123.1 };
}
```

## 2.4. Union типы

Union типы позволяют перемнной принимать значения из нескольких типов.
Пример: переменная как строка или число для универсального ID.

1. Проблема типа `any`
   Использование `any` снижает типобезопасность, позволяя присвоить значение любого типа.

2. Объявление Union типа
   Синтаксис: `number | string` для объявления переменной, которая может быть или числом, или строкой.

3. Применение в функциях
   Функции могут принимать параметры Union типов.
   Демонстрация на функции `printId`, принимающей `number | string`.

4. Работа с Union типами
   Использование `typeof` для проверки типа во время выполнения и выполнения различных операций в зависимости от типа.
   Пример: преобразование строки в верхний регистр если передан тип `string`.

5. Type guards
   Сужение типов с помощью проверок, например, через `typeof` или проверку на массив, позволяет TypeScript корректно определять тип в определенном блоке кода.

6. Расширенный пример с пользователем

- Работа с переменной, представляющей одиночного пользователя или массив пользователей.
- Демонстрация использования проверок для работы с различными типами.

```javascript
// Автоматическое определение и явное указание типа
let a = 5; // TypeScript автоматически определяет тип number
let n: number = 5; // Явное указание типа

// Строки (String)
// Пример объявления строки
let b: string = "текст";

// Булевы значения (Boolean)
// Определение булевого типа
let isActive: boolean = true;

// Type Safety и приведение типов
// TypeScript предотвращает присваивание значения неподходящего типа
// a = b; // Ошибка: Type 'string' is not assignable to type 'number'
// a = "текст"; // Ошибка: нельзя присвоить строку переменной типа number

// Пример автоматического приведения типов (конкатенация строки и числа)
let c = a + b; // Результатом будет строка

let s = "5";
// Явное приведение типов к Number
n = a + Number(s); // 10

// Массивы
let names: string[] = ["abc", "def"]; // Массив строк
let numbers: number[] = [1, 2, 3]; // Объявление массива чисел

// Tuples (Кортежи)
// Определение и использование tuple
let tuple: [number, string] = [2, "текст"];
tuple.push("abcdef"); // Добавление элементов
console.log(tuple); // [ 2, 'текст', 'abcdef' ]

// Any
// Использование `any` для обозначения любого типа
// Не рекомендуется к использованию из-за отсутствия типовой безопасности
let anything: any = 3; // Желательно явно указать что это тип any
anything = "теперь я строка";
anything = true; // Может быть преобразован в любой тип

let anyArr: any[] = ["abc", 3, true]; // Массив с элементами любых типов

// Функции
// Типизация аргументов и возвращаемого значения
// Пример функции, принимающей строку и возвращающей строку
function greet(name: string): string {
  return name + " привет!";
}

// Типизация анонимных функций, пример типизации аргумента функцииы
names.map((x: string) => x);

// Объектные типы (обычно вместо такой записи используются интерфейсы)
function getCoordinates(): { latitude: number, longitude: number } {
  return { latitude: 34.5, longitude: -123.1 };
}

// Union тип
// Переменная, которая может быть или числом, или строкой
let universalId: number | string = 5;
universalId = "abc";

// Функции могут принимать параметры Union типов
function printId(id: number | string) {
  // console.log(id.toUpperCase()); // Ошибка, это может быть number

  // Использование `typeof` для проверки типа во время выполнения
  // Пример: преобразование строки в верхний регистр если тип `string`
  // Сужение типов при помощи проверки типов Type guards
  if (typeof id == "string") {
    console.log(id.toUpperCase()); // Строка в верхнем регистре
  } else {
    console.log(id); // Число
  }
}

// Функция, которая может принять один string-параметр, или массив
function helloUser(user: string | string[]) {
  if (Array.isArray(user)) {
    console.log(user.join(", " + "Hi!")); // Массив строк user[]
  } else {
    console.log(user + "Hi!"); // Строка user
  }
}
```

## 2.5. Interfaces и Types

### Тайпы (Type Aliases)

1. Определение: Позволяют задать алиас для типа данных.
2. Пример: Создание типа для координат, объединение `number` и `string` в один тип `ID`.
3. Применение: Тайпы полезны для создания новых типов из простых типов или их объединений.
4. Ограничения: Тайпы не поддерживают слияние определений.

### Интерфейсы

1. Определение: Объявляют структуру для объектов.
2. Преимущества: Поддерживают наследование и расширение, а также слияние между разными объявлениями.
3. Ограничения: Описывают только объекты, не поддерживают объединение примитивных типов.

### Сравнение Тайпов и Интерфейсов

`Слияние Определений`:
Только интерфейсы поддерживают слияние определений.

`Описание Примитивов`:
Тайпы могут описывать примитивы и их объединения, чего не могут интерфейсы.

### Рекомендации по Использованию

Интерфейсы рекомендуется использовать, когда необходимо описать структуру объектов или нужно использование наследования.
Тайпы используются когда нужно создать новые типы через объединение примитивных типов или когда требуется объединение типов.

```javascript
// Type Aliases
// Создание типа для координат coord позволяет переиспользовать типы
type coord = { latitude: number, longitude: number };

// Type Aliases часто используются вместо Объектных типов
function getCoordinates2(): coord {
  return { latitude: 34.5, longitude: -123.1 };
}

// Интерфейсы
// Есть соглашение для интерфейсов по форме записи чтобы отличать от классов
// Соглашение не всегда используется и зависит от договоренностей разработчиков
interface ICoord {
  latitude: number;
  longitude: number;
}

function getCoordinates3(): ICoord {
  return { latitude: 34.5, longitude: -123.1 };
}

// Интерфейсы описывают только объекты
// Type Aliases могут описывать простые типы и объекты
type ID = number | string;
// Особенность Type Aliases: можно описать свой тип строки,
// но эта запись бесполезна т.к. везде будет использоваться простой тип string
type myString = string;

// Интерфейсы поддерживают наследование и расширение,
// а также слияние между разными объявлениями
interface Animal {
  name: string;
}

interface Dog extends Animal {
  tail?: boolean; // не обязательный параметр
}

// Создание реального объекта
const dog: Dog = {
  name: "Charli",
};

// Аналогичный пример на основе типов для растения
type Plant = {
  name: string,
};

// Используется объединение типов &
// Tree будет содержать как свойство name так и color
type Tree = Plant & {
  color?: string,
};

// Создание реальных объектов
const tree: Tree = {
  name: "Дуб",
  color: "Темно-зеленый",
};

const tree2: Tree = {
  name: "Ель",
};

// Интерфейсы можно объединять/merge т.е. всегда можно дополнить
// (типы не могут учавствовать в слиянии определений, возникнет ошибка)
// Пример, как можно дополнить существующий интерфейс Dog (создан выше)
// В интерфейс Dog добавляется опциональное свойство color?
interface Dog {
  color?: string;
}

const dog2: Dog = {
  name: "Bob",
  tail: true,
  color: "Black",
};
```

## 2.6. Литеральные типы

Определение: Строковый литерал — это тип данных, представляющий собой конкретное строковое значение, а не любую возможную строку.

Примеры:
Объявление переменной: `let A = "text";` – A может принимать любые строковые значения.
Объявление константы: `const A = "text";` – A имеет тип, соответствующий значению "text".

### Применение строковых литералов

Ограничение значений:
Позволяет ограничить значения, которые может принимать переменная или параметр функции.

Пример: Для направления движения собаки определены только "left" и "right".

### Литеральные типы в функциях

Функции с ограничением параметров:
Использование типов-литералов в параметрах функций для обеспечения точности и безопасности кода.

Пример: Функция `moveDog(direction: "left" | "right")` принимает только "left" или "right" в качестве аргумента.

### Числовые литералы

Пример использования:
Можно задать конкретные числовые значения как типы, управляя таким образом возможными результатами функции.

Пример функции: возвращает `-1` для "left", `1` для "right", и `0` по умолчанию.

### Комбинирование литеральных типов

Сложные типы:
Возможность комбинировать литеральные типы с другими типами данных, например, с интерфейсами для создания сложных типов.

Пример: Использование строкового литерала "default" для указания стандартного подключения к БД.

### Приведение типов

Type Assertion:
Использование приведения типов для управления и преобразования типов данных для работы со строковыми литералами в различных контекстах.

Пример: Приведение строки к типу `"HTTP" | "HTTPS"` для обозначения протокола.

```javascript
// Литералы

// Объявление переменной с типом string: let A: string
// let A: string = "text";
let A = "text"; // A может принимать любые строковые значения

// Литеральный тип "text": const B: "text"
// const B: "text" = "text";
const B = "text"; // B имеет тип, соответствующий значению "text"

// Применение строкового литерального типа:
type direction = 'left' | 'right';

// Числовые литералы и строковые литералы
// Пример функции с аргументом типа direction
// Возвращается литеральный тип для чисел: -1 | 0 | 1
function moveDog(direction: direction): -1 | 0 | 1 {
    switch (direction) {
    // Желательно использовать также default
    // т.к. в runtime возможна ситуация, что
    // поступит значение отличающееся от допустимых в direction
        case 'left':
            return -1;
        case 'right':
            return 1;
        default:
            return 0;
    }
}

// В функцию moveDog() можно передать только 'left' или 'right'
moveDog('left');
moveDog('right');
// moveDog('other'); // Ошибка: not assignable to parameter of type 'direction'

// Комбинирование литеральных типов, например для функции соединения с БД:
interface IConnection {
    host: string;
    port: number;
    protocol?: string;
}

// Пример аргумента который может быть интерфейс либо строка "default"
function connect(connection: IConnection | "default" ) {
    // ...
}

// Разрешены вызовы
connect({ host: 'localhost', port: 9000 });
connect('default');

// Преобразование типов (кастинг)
// Как кастовать строку к конкретному строковому литералу
let protocol1 = 'http'; // в данном случае protocol1 имеет тип string
let protocol2 = 'http' as 'http'; // protocol2 имеет тип 'http' строковый литерал

const connection1 = {
    host: 'localhost',
    port: 9000,
    protocol: 'http' // protocol имеет тип string
};

// as позволяет выполнить кастинг к конкретному строковому литералу
const connection2 = {
    host: 'localhost',
    port: 9000,
    protocol: 'http' as 'http' // преобразование к литеральному типу 'http'
};

// Пример фукнкции где параметр protocol имеет литеральный тип
function connectWithProtocol(host: string, protocol: 'http' | 'https' ) {
    // ...
}

// Ошибка, поскольку connection1.protocol имеет тип string
// connectWithProtocol(connection1.host, connection1.protocol);
// Все OK поскольку connection2.protocol это литерал 'http'
connectWithProtocol(connection2.host, connection2.protocol);

// Пример кастинга, аналогично можно кастить объекты, интерфейсы и типы
let anyVariable: any = 5;
// Кастинг к типу number рекомендуется использовать as
let numVariable: number = anyVariable as number;
// Равносильная запись
// Не рекомендуется поскольку она не будет работать с JSX
// В React <> это JSX элемент, поэтому возникнет ошибка
let numVariable2 = <number>anyVariable;
```

## 2.7. Enum

Enum в TypeScript позволяет определить набор именованных констант. Помогает упрощать работу с наборами связанных значений.

Пример: Ранее рассмотренный тип `TypeDirection` со значениями `left` и `right` может быть представлен как Enum.

### Синтаксис и использование

`Определение Enum`:

```typescript
enum Direction {
  left,
  right
}
```

Это позволяет обращаться к значениям как `Direction.left` или `Direction.right`.

`Числовые Enum`:
По умолчанию значения Enum начинаются с `0`. Можно изменить начальное значение.

`Строковые Enum`: Можно явно указать строковое значение для каждого элемента Enum.

`Гетерогенные Enum`:
Могут содержать как числовые, так и строковые значения, хотя на практике редко используются.

### Продвинутое использование

`Расчётные значения`:
Enum могут иметь расчётные значения, хотя эти значения должны быть определены на момент компиляции.

`Const Enum`:
Для повышения производительности можно использовать `const enum`, тогда Enum будет полностью вычислен при компиляции и не будет присутствовать в runtime как объект.

### Примеры

`Использование в функциях`:
Enum удобно использовать в качестве параметров функций для обеспечения строгой типизации.

```typescript
function move(direction: Direction) {
  switch (direction) {
    case Direction.left:
      return -1;
    case Direction.right:
      return 1;
  }
}
```

`Enum в runtime`:
В runtime Enum ведут себя как обычные объекты, позволяя взаимодействовать с ними соответствующим образом.

```typescript
// Enum
// Для сравнения со строковым литеральным типом
// type direction = 'left' | 'right';

// Числовые Enum
// По умолчанию значения Enum начинаются с `0`
// Можно изменить начальное значение Direction.left = 0
// Значения можно изменять, например, для отправки json
enum Direction {
  left = 10, // Изменилось значение по умолчанию на 10
  right // right = 11, назначено автоматически
}

// Это позволяет обращаться к Enum значениям как
const d1 = Direction.left;
const d2 = Direction.right;

// Строковые Enum
// Можно явно указать строковое значение
// для каждого элемента Enum
enum DirectionStr {
  left = 'LEFT', // Изменение значения по умолчанию для left
  right = 'RIGHT' // Для строковых Enum нужно задать все значения
}

// Гетерогенные Enum
// Могут содержать как числовые, так и строковые значения,
// на практике редко используются
enum DirectionNumStr {
  left = 1, // Изменение значения по умолчанию на 1
  right = 'RIGHT' // Можно указать значения другого типа 'RIGHT'
}

// Расчётные значения
// Enum могут иметь расчётные значения,
// эти значения должны быть определены на момент компиляции
enum DirectionCalc {
  left = '1234'.length, // Изменилось значение на расчётное
  right = '12'.length // Значение вычисляется при инициализации
}

// Использование в функциях в качестве параметров для строгой типизации
function move(direction: Direction) {
  switch (direction) {
    case Direction.left:
      return -1;
    case Direction.right:
      return 1;
  }
}

// Enum в runtime
// В runtime Enum ведут себя как обычные объекты
function objMod(obj: { left: number }) {
  // ...
}

objMod(Direction);

// Const Enum
// Для повышения производительности можно использовать `const enum`,
// тогда Enum будет полностью вычислен при компиляции
// и не будет присутствовать в runtime как объект
const enum DirectionConst {
  up,
  down
}

// В Runtime вместо объекта будет значение 0 для Const Enum
let myDirection = DirectionConst.up;
```

## 2.8. Generics

Generics в TypeScript - это средство для создания универсальных, переиспользуемых функций, классов и интерфейсов, работающих с различными типами данных.
Дженерики позволяют уменьшить дублирование кода, следуя принципу DRY (Do Not Repeat Yourself).

### Примеры Использования Generics

1. Базовый Пример с Функцией:

   Проблема:
   Необходимость создания множественных функций для работы с разным типом данных (напр., числами и строками).

   Решение:
   Введение типа `T` (может быть любым названием), позволяющего функции работать с любым переданным типом данных.

2. Расширенный Прием:
   Возможность использования нескольких дженерик параметров (напр., `T` и `K`) для создания более сложных структур.

### Ограничения Дженериков

Возможность наложения ограничений на типы, которые можно использовать в дженериках, через использование ключевого слова `extends`.

### Дженерики в Интерфейсах

Пример: Описание методов в интерфейсе, которые также могут использовать дженерики для универсализации и типизации.

```typescript
// Generics

// Пример функции без использования Generics
// Может быть неверная реализация
// если необходимо на входе и выходе получить одинаковый тип
// В данном случае тип на входе и выходе может отличаться
function log(obj: string | number): string | number {
  console.log(obj);
  // ... дополнительные действия ...
  return obj;
}

// Потребуется дублировать код функций для разных типов
function log1(obj: string): string {
  console.log(obj);
  return obj;
}

function log2(obj: number): number {
  console.log(obj);
  return obj;
}

// Использование Generics
function logUniversal<T>(obj: T): T {
  console.log(obj);
  return obj;
}

// Переиспользование функции с различными типами
logUniversal<string>('abc');
logUniversal<number>(5);

// Пример использования нескольких Generics
function logUni2<T, K>(obj: T, arr: K[]): K[] {
  console.log(obj);
  return arr;
}

logUni2<string, number>('str', [1, 2, 3]);

// Сужение Generics для использования с определенными свойствами
interface HasLength {
  length: number;
}

function logSpecial<T extends HasLength, K>(obj: T, arr: K[]): K[] {
  // Объект T обязательно имеет свойство length
  const l: number = obj.length;
  console.log(obj);
  return arr;
}

// Дженерики в Интерфейсах
// Функция bid может иметь различные типы аргументов
interface IUser {
  name: string;
  age?: number;
  bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T): boolean {
  return true;
}
```

## 2.9. Классы

JavaScript поддерживает как функциональный, так и объектно-ориентированный подход.

1. Основные концепции классов:

   `Объявление класса`:
   Пример с классом `Coordinate`, имеющим свойства `latitude` и `longitude`.

   `Создание экземпляра класса`:
   `new Coordinate()` для создания объекта точки.

   `Конструкторы`:
   Методы для инициализации объектов класса. Используется ключевое слово `this` для обращения к свойствам.

   `Наследование`:
   Создание классов на основе существующих (например, `MapLocation extends Coordinate`).

2. Модификаторы доступа и специальные методы:

   `Public`, `Private`, `Protected`:
   Управление доступом к методам и свойствам класса.

   `get` и `set`:
   Методы для контроля доступа к свойствам класса.

   `Статические методы и переменные`:
   Принадлежат классу и доступны без создания экземпляра.

   `Абстрактные классы`:
   Нельзя создать экземпляр, используются как базовый класс для наследования.

3. Использование дженериков с классами:

   Дженерики позволяют создавать классы, методы и свойства, которые могут работать с любым типом данных, указанным при создании экземпляра или объявлении класса.

4. Интерфейсы и реализация:

   Определение контракта, которому должен соответствовать класс.

   Интерфейсы vs Абстрактные классы:
   Интерфейсы определяют только сигнатуру методов без их реализации.

5. Практические аспекты:

Работа с конфигурационными файлами TypeScript для управления строгостью типов и инициализацией свойств.

Лучше использовать свойство `"strictPropertyInitialization": false` не контролировать инициализацию свойств. Иначе, если эта настройка true, нельзя будет использовать классы в качестве интерфейсов.

```json
    "strictPropertyInitialization": false,
```

Наследование и переопределение методов (`override`).

Управление доступностью методов в наследуемых классах.

```typescript
// Классы

// Класс без конструктора
class Point {
  x: number;
  y: number;
}

// Создание экземпляра класса (Creating an instance of a class)
// Создание объекта точки без заполнения свойств
let coord = new Point();
// Дальнейшее заполнение свойств
coord.x = 12568;
coord.y = 45689;

// Объявление класса
// Пример с классом имеющим свойства latitude и longitude
class Coordinate {
  message = '1';
  latitude: number;
  longitude: number;

  // protected метод дотупен в классе-родителе и наследнике
  // но недоступен в экземпляре (инстансе)
  protected test() {
    if (this.latitude > 0) {
      console.log('Успешное тестирование...');
      //....
    }
  }

  // Пример метода для расчета дистанции
  computeDistance(newLat: number, newLng: number) {
    return 0;
  }

  // Конструкторы
  // Методы для инициализации объектов класса
  constructor(lat: number, lng: number) {
    // Используется ключевое слово this для обращения к свойствам
    this.latitude = lat;
    this.longitude = lng;
    console.log(this.message); // Контроль последовательности вызовов
  }
}

// Наследование
// Создание классов на основе существующих
class MapLocation extends Coordinate {
  message = '2';
  // _ нижнее подчеркивание это соглашение
  private _name: string; // Само значение _name приватное
  // # это приватное свойство в JavaScript в TS редко используется
  #b: boolean;

  // Доступ к приватному значению _name через Getter
  get name() {
    // Getter позволяет добавить дополнительную логику
    return this._name;
  }

  set name(s: string) {
    // Setter позволяет добавить дополнительную логику
    this._name = s + '_Extra!';
  }

  // Переопределение метода (лучше использовать с override)
  // В новой версии TypeScript 4.3 появилось override
  // override определение помогает исключить ошибки если
  // в базовом классе убрать метод с таким же именем
  override computeDistance(newLat: number, newLng: number) {
    console.log(this.name);
    return 1;
  }

  // Конструктор класса-наследника
  constructor(lat: number, lng: number, name: string) {
    // Сначала в конструкторе класса-наследника
    // Необходимо вызвать конструктор базового класса
    // Первым исполнится конструктор базового класса
    super(lat, lng);
    // Затем идут другие действия инициализации
    this.test();
  }
}

let loc = new MapLocation(1, 2, 'Начало света');
// Property 'test' is protected and only accessible within class
// 'Coordinate' and its subclasses.
// loc.test();

// Абстракции при помощи интерфейсов
// Интерфейс - это желаемое поведение
// Интерфейс определяет как должна выглядеть реализация
interface loggerService {
  log: (s: string) => void;
}

// Имплементация интерфейса
// Потребуется обязательно реализовать методы интерфейса
// Интерфейс это некий адаптер соединяющий взаимодействующие классы
class Logger implements loggerService {
  // Используется модификатор public (по умолчанию или явно)
  public log(s: string) {
    console.log(s);
  }

  // Приватные методы и переменные недоступны извне
  private error() {
    console.log('Error');
  }

  private a = 'PRIVATE';
}

const l = new Logger();
l.log('d');
// l.error(); // Приватные методы и переменные недоступны извне

// В TypeScript нет статических классов как в C#,
// но есть статические переменные и методы

// Статические методы и переменные классов в TypeScript
// существуют до создания инстансов
class MyClass {
  // Статическая переменная
  static a = '555';

  // Статический блок инициализации
  static {
    // Описание статической части инициализации класса
    // Появилось в TypeScript 4.4
  }
}

// Для классов со статическими методами или переменными
// не требуется инициализация, можно сразу к ним обратиться
console.log(MyClass.a);

// Классы с Дженериками
// существуют только на этапе Complile
class GenClass<T> {
  a: T;
}

let gen = new GenClass<string>();
gen.a; // GenClass<string>.a: string

// Абстрактные классы
// Имеют ограничение - нельзя создать экземпляр абстрактного класса
abstract class Base {
  // Абстрактные классы содержат готовую базовую функциональность,
  // но требует от пользователей этого класа добавить функциональность
  print(s: string) {
    console.log(s);
  }

  // Объявление абстрактного метода, который потребуется реализовать
  abstract error(s: string): void;
}

// Требуется расширить абстрактный класс и затем создать экземпляр
class BaseExtended extends Base {
  // Обязательно необходимо реализовать абстрактные методы
  error(s: string): void {
    console.log('');
  }

  // Дополнительная логика
}

// Создание экземпляра
const e = new BaseExtended();

// Расширение и сужение классов
class Model {
  model: string;

  getInfo(): string {
    return `Model: ${this.model}`;
  }
}

class Car extends Model {
  color: string;
  length: number;

  getInfo(): string {
    return `Model: ${this.model}, Color: ${this.color}, Length: ${this.length}`;
  }
}

// Создание экземпляря более расширенного класса
// bmwX5 будет содержать все свойства: color, length, model
// но доступ при этом будет только к car.model
const x1: Model = new Car();

// Приведение типа
const carX1 = x1 as Car;
carX1.model = 'BMW';
carX1.color = 'Green';
carX1.length = 5;

console.log(`Модель: ${x1.model}`); // работает
// console.log(`Модель: ${x1.color}`); // ошибка

function printCarInfo(m: Model) {
  // Ошибки досупа к m.color и m.length
  // console.log(`Модель: ${m.model}, цвет: ${m.color}, длина: ${m.length}`);
  if (m instanceof Car) {
    // Теперь m.color и m.length доступны
    console.log(`Модель: ${m.model}, цвет: ${m.color}, длина: ${m.length}`);
  }
}

printCarInfo(x1);

// Когда это полезно:
// При работе с API, возвращающими объекты базового типа.
// В обобщённых коллекциях (Model[]), которые могут содержать разные подклассы.
// При написании функций, принимающих общий тип, но обрабатывающих по-разному.

function printInfo(m: Model) {
  console.log(m.getInfo());
}

printInfo(carX1); // Вызовет getInfo() из Car — это полиморфизм
```

## 2.10. Другие типы и возможности

1. KeyOf и TypeOf

TypeOf:
позволяет получить тип переменной. Например, если у нас есть строка `a = "Привет"`, с помощью TypeOf мы можем выполнить проверку `if TypeOf a == String` и присвоить этот тип другой переменной `b: TypeOf a = "Пока"`.

KeyOf:
используется для создания типа, который может принимать значение только из ключей другого типа. Например, для типа `Coordinate` с ключами `latitude` и `longitude`, `type p = KeyOf Coordinate` позволит переменной `a` принимать значения `latitude` или `longitude`.

2. Работа с Null и Optional Chaining

Null:
представляет собой тип, указывающий на отсутствие значения. Например, в функции, которая принимает `a` как строку или `null`, использование методов строки напрямую вызовет ошибку. Optional chaining (`a?.toLowerCase()`) или явная проверка на null (`if (a !== null)`) позволяют работать с такими переменными без ошибок.

3. Void

Тип `void` используется для функций, не возвращающих значение. Например, функция `function log(): void` ничего не возвращает.

4. Использование восклицательного знака и строгая проверка

Восклицательный знак (`!`) указывает на уверенность в наличии значения, однако лучше использовать явные проверки. Строгая проверка на null (`strict null check`) требует явного обращения с типом `null` в TypeScript.

5. Редко встречающиеся типы

`BigInt`: используется для работы с очень большими числами.
`Symbol`: представляет символы, которые позволяют создать уникальный идентификатор для объектов или строк.

```typescript
// TypeOf позволяет получить тип переменной
let hello = 'Привет';

// С помощью TypeOf мы можем выполнить проверку

if (typeof hello == 'string') {
  // ....
}

// И присвоить этот тип другой переменной
// Сделать переменную other с таким же типом как у a
let other: typeof hello = 'other тоже строка';

// KeyOf: используется для создания типа,
// который может принимать значение только из ключей другого типа.
type Coord = {
  latitude: number;
  longitude: number;
};

// Позволит переменной K принимать значения latitude или longitude
type K = keyof Coord;

// можно использовать только 'latitude' и 'longitude'
let y: K = 'latitude';
let z: K = 'longitude';

// null - это тип, указывающий на отсутствие значения
// Использование методов строки напрямую вызовет ошибку
// void - значит ничего не возвращается
function logging(a: string | null): void {
  // 1 способ проверки: Optional chaining
  a?.toLowerCase();
  // 2 способ проверки: явная проверка на null
  if (a !== null) {
    a.toLowerCase();
  }
  // ! означает, что a будет точно существовать (это рисковано)
  // Лучше вместо этого кода сделать корректную проверку
  a!.toLowerCase();
}

// BigInt используется для работы с очень большими числами
const big: bigint = BigInt(100);

// Symbol позволяют создать уникальный идентификатор из строк или объектов
const uniqSymbol: symbol = Symbol('alskjfonq');
```

## 3.1. Обзор архитектуры

Создание структурированной архитектуры приложения с возможностью раздельного тестирования компонентов.

Слоеная архитектура (`Layered architecture`): Метод разделения приложения на отдельные слои с уникальными обязанностями для повышения поддерживаемости и масштабируемости.

### Компоненты Архитектуры

1. Middleware
   Роль: Промежуточная обработка запросов.
   Могут быть как глобальные, так и на уровне контроллера. Например, авторизация или валидация может быть реализована на уровне Middleware.

2. Контроллер
   Роль: Обработка входящих запросов и передача их в сервисы.
   Осуществляет начальное преобразование запроса.

3. Сервис
   Роль: Реализация бизнес-логики.
   Отделён от контроллеров, обеспечивает взаимодействие с репозиториями.

4. Репозиторий
   Роль: Взаимодействие с базой данных.
   Изолирует логику взаимодействия с данными от бизнес-логики.

5. ExceptionHandler
   Роль: Обработка исключений.
   Интегрированы в middleware.

### Преимущества Слоеной Архитектуры

1. Модульность и Тестируемость: Каждый компонент можно тестировать отдельно.
2. Гибкость: Легкость в изменении и добавлении новых функций без вмешательства в другие слои.
3. Поддерживаемость: Чёткое разграничение обязанностей упрощает управление и обновление приложения.
4. Масштабируемость: Удобно для как малых так и больших приложений, включая микросервисы.

### Что такое Elasticsearch?

Elasticsearch (ES) — это поисковый и аналитический движок, основанный на Lucene.
Часто используется как хранилище логов и база для быстрого поиска по ним.

#### Назначение:

Централизованное хранение логов.
Быстрый поиск, фильтрация, агрегации.
Визуализация через Kibana (входит в Elastic Stack).

#### Пример использования как логгера:

Приложение (например, Node.js или Django) пишет логи в формате JSON.
Логи отправляются через Logstash или Filebeat в Elasticsearch.
В Kibana можно построить графики, фильтры и дашборды.

### Что такое Prometheus?

Prometheus — это система мониторинга и сбора метрик, разработанная в основном для сбора временных рядов (time-series).

#### Назначение:

Мониторинг сервисов и инфраструктуры.
Сбор метрик (не логов!): загрузка CPU, число запросов, длительность и т.д.
Поддерживает язык запросов PromQL.
Хорошо работает с Grafana для визуализации.

## 3.2. Класс приложения

Структурирование проекта, создание класса приложения.

1. Переструктурирование проекта:

   - Удаление неиспользуемых частей.
   - Весь исходный код перемещается в папку `src` для лучшей организации и удобства работы с ресурсами.

Если весь код приложения находится в `src`, то при компиляции tsc в каталоге `dist` будет сформирована структура подкаталогов из папки `src`. Если код проекта расположен не только в папке `src`, будет сгенерирована структура всех подкаталогов в результирующем каталоге `dist`.

2. Создание класса приложения:

   - Наименование класса соответствует названию файла.
   - Используется экспорт созданного класса App.
   - Реализация пустого конструктора для будущих зависимостей.
   - Введение метода инициализации `async init`.

3. Работа с Express:

   - Создание экземпляра Express в конструкторе класса App.
   - Типизация и импорт необходимых элементов из Express.
   - Настройка порта, с возможностью конфигурирования.

4. Инициализация и запуск сервера:

   - Метод `useRoutes` для роутинга.
   - Определение основных методов инициализации сервера и прослушивание порта.
   - Упрощение инициализации без непосредственного использования `exception filter` и `middleware`.

app.ts

```typescript
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
```

5. Основная точка входа:

   - Создание файла `main.ts` для запуска приложения.
   - Функция `bootstrap` для инициализации класса и запуска метода `init`.

```typescript
import { App } from './app';

async function bootstrap() {
  const app = new App(); // Создание приложения
  await app.init(); // Инициализация приложения
}

// Точка входа в приложение
bootstrap();
```

6. Настройка TypeScript и запуск проекта:

   - Модификация `package.json` и `tsconfig.json` под нужды проекта.
   - Команды для сборки и запуска проекта.

В тестовом проекте до этого использовался `"type": "module"`. В `tsconfig.json`: `"module": "ES6"`.

Для старых проектов нужно использовать `"type": "commonjs"` (commonjs можно использовать и в современных проектах, поскольку не принципиально как будет выглядеть скомпилированный код JavaScript). Также потребуется внести изменения в `tsconfig.json`: `"module": "commonjs"`.

```json
{
  "name": "bin-api",
  "version": "1.0.0",
  "description": "API for Testing NodeJS",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "start": "node ./dist/main.js",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Yury Belokhonov",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.1"
  }
}
```

Сборка, запуск и тестирование:

```shell
npm run build
npm start
http POST http://localhost:8000/users/login
http POST http://localhost:8000/users/register
```

## 11.3. Logger

Структуризация по доменным областям.
В проекте будем использовать структуру папок по доменным областям. Например, вся работа с пользователями находится в папке `/users` (все, что касается контроллера, сервиса или работы с репозиторием пользователей). Все что относится к логированию будет расположено в папке `/logger`.

1. Логирование:

   - Создание отдельной папки для логера в структуре проекта `/logger`.
   - Использование типизированной библиотеки `ts-log` для логирования (возможно использование любой другой библиотеки). Класс разрабатывается так, чтобы его можно было легко заменить на другую реализацию.

```shell
   npm i tslog
```

2. Разработка Логгер-Сервиса:

   - Разработка класса `LoggerService` для управления логированием.
   - Реализация методов `log`, `error`, и `warn` для различных уровней логирования.
   - Приватное инкапсулирование экземпляра логгера для скрытия внешних деталей реализации и настроек.

`src\logger\logger.service.ts`

```typescript
import { Logger, ILogObj } from 'tslog';

// Абстракция логгера скрывает настройки конфигурации от пользователя
// Также имеется возможность дополнять функционал и расширять методы логгера
// например, отправка сообщений в другие сервисы: sentry / rollbar
export class LoggerService {
  public logger: Logger<ILogObj>;

  constructor() {
    // В новой версии tslog конфигурирование логов происходит через шаблонную строку
    const loggerTemplate = '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ';
    // Создание логгера

    this.logger = new Logger({
      prettyLogTemplate: loggerTemplate
    });
  }

  // log принимает аргументы неизвестного типа
  public log(...args: unknown[]) {
    this.logger.info(...args);
  }

  public error(...args: unknown[]) {
    // Возможны дополнительные Side эффекты:
    // например, отправка в sentry / rollbar
    this.logger.error(...args);
  }

  public warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
```

3. Преимущества Абстракции Логгер-Сервиса:

   - Удобное управление конфигурациями логирования.
   - Возможность добавления дополнительных сайд-эффектов (напр., интеграция с системами уведомлений).
   - Расширяемость и возможность легкой замены базового логгера на другой.

4. Внедрение Зависимостей (Dependency Injection, DI):

   - Проблемы статичного подхода к вызову методов логирования. В данном случае, например при тестировании, потребуется заменять `import` во всех файлах проекта, где используется класс `LoggerService`. Невозможно будет отдельно провести тестирование / мок-тестирование.
   - Пример простейшего DI посредством передачи экземпляра `LoggerService` через конструктор. Необходимо создать экземпляр `LoggerService` в котором нет статических методов.
   - Описание сложностей с глубоким внедрением зависимости и их решении через DI.

`src\app.ts`

```typescript
import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

export class App {
  app: Express; // Интерфейс приложения Express
  server: Server; // Используется стандартный 'node:http'
  port: number; // Порт может быть конфигурируемым
  logger: LoggerService;

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
```

Изменения в `src\main.ts`

```typescript
import { App } from './app';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  // Внедрение Зависимостей (Dependency Injection, DI)
  // Внедряем в App через конструктор зависимость от другого сервиса
  // В данном месте можно легко подменить реализацию LoggerService()
  const app = new App(new LoggerService()); // Создание приложения
  await app.init(); // Инициализация приложения
}

// Точка входа в приложение
bootstrap();
```

5. Запуск и Проверка Работоспособности:

   - Запуск приложения и проверка формата логов.
   - Возможные улучшения системы логирования и внедрения зависимостей.

```shell
npm run build
npm start
http POST http://localhost:8000/users/login
http POST http://localhost:8000/users/register
```

С добавлением логгирования изменился формат сообщений, появилось время и тип сообщения:

```log
> bin-api@1.0.0 start
> node ./dist/main.js

2025-05-01 10:07:37 INFO: Сервер запущен на http://localhost:8000
```

### Что такое внедрение зависимостей (DI)?

Внедрение зависимостей — это паттерн, при котором класс или функция получают нужные зависимости (например, логгер, БД, API-клиент) снаружи, а не создают их внутри себя.

✅ Пример правильного подхода:

```ts
class MyService {
  constructor(private readonly logger: LoggerService) {}

  run() {
    this.logger.log('Starting...');
  }
}
```

Таким образом:
Класс `MyService` не зависит напрямую от реализации `LoggerService`.
Мы можем легко подменить логгер при тестировании или в разных окружениях.

### Почему не стоит использовать статические методы?

```ts
class StaticLogger {
  static log(message: string) {
    console.log(message);
  }
}
```

#### Минусы статических методов:

1. Нет возможности подменить зависимость.
2. При тестировании нельзя заменить `StaticLogger.log()` на заглушку или мок.
3. Жесткая связанность (tight coupling).
4. Весь код, использующий `StaticLogger`, напрямую зависит от него.
5. Нет возможности конфигурировать поведение.
6. Статические классы плохо расширяются, например, для разных уровней логирования, фильтрации, форматирования или отправки в `Sentry`.

### Влияние на тестирование

В подходе c DI можно сделать так:

```ts
const mockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

const service = new MyService(mockLogger as unknown as LoggerService);
```

Таким образом:

- легко мокируется логгер;
- можно проверять, вызывался ли log() или error() в нужных ситуациях;
- отделяется тест от настоящего вывода в консоль или Sentry.

### Как улучшить текущий `LoggerService`

1. Создать интерфейс логгера:

```ts
export interface ILogger {
  log(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
}
```

2. Использовать его:

```ts
export class LoggerService implements ILogger {
  private readonly logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      prettyLogTemplate: '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: '
    });
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
```

Теперь можно внедрять его через интерфейс — это даст максимум гибкости.

### Как внедрять в приложение?

В простом случае — вручную:

```ts
const logger = new LoggerService();
const service = new MyService(logger);
```

В более сложных проектах (например, NestJS или InversifyJS) — через DI контейнер:

```ts
@injectable()
class MyService {
  constructor(@inject(LoggerService) private readonly logger: ILogger) {}
}
```

## 3.4. Базовый класс контроллера BaseController

Создание общего базового контроллера для последующего наследования.

1. Общая концепция:
   Разработка базового контроллера, содержащего общую функциональность для наследования специфическими контроллерами.

2. Задача:
   Позволить наследование базовой функциональности и добавление специфических реализаций.

### Реализация Базового Контроллера

1. Создание класса `BaseController`:
   Определяем как абстрактный класс `abstract class BaseController {...}` для предотвращения прямого инстанцирования.
   В конструкторе класса интегрируем логгер для мониторинга инициализации.

В TypeScript, если используются модификаторы доступа (private, public, protected) непосредственно в параметрах конструктора, то переменная logger автоматически создаётся как приватное свойство класса. Её не нужно дополнительно объявлять в теле класса — TypeScript сам делает это:

```TypeScript
constructor(private logger: LoggerService) { ... }
```

Использование модификатора в параметрах конструктора — это сокращённая запись.
Эквивалентная запись вручную выглядела бы так:

```TypeScript
export abstract class BaseController {
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }
}
```

2. Роутинг:
   Интеграция экспресс-роутера для отдельного контроллера.
   Создание приватного экземпляра роутера и метода его получения.

3. Метод `bindRoutes`:
   Защищенный метод для биндинга роутов.
   Принимает массив роутов и связывает их с функциями в контроллере.

4. Определение интерфейса `IControllerRoute`:
   Описывает путь, функцию обработки запроса и метод HTTP (GET, POST, DELETE, PATCH, PUT).

`src\common\route.interface.ts`

```TypeScript
import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoute {
	path: string;
	// Стандартная функция Express
	func: (req: Request, res: Response, next: NextFunction) => void;
	// Перечисляем все допустимые методы
	// Возможна запись ниже, но без гарантии соответствия возможным методам
	method: 'get' | 'post' | 'delete' | 'patch' | 'put';
}
```

5. Типизация методов HTTPS:
   Улучшение стабильности кода через использование TypeScript, чтобы избежать возможных ошибок в рантайме за счёт строгой типизации методов запроса.

`src\common\route.interface.ts`

```TypeScript
import { NextFunction, Request, Response, Router } from 'express';

// Роут контроллера
export interface IControllerRoute {
	path: string;
	// Стандартная функция Express
	func: (req: Request, res: Response, next: NextFunction) => void;
	// Перечисляем все допустимые методы
	// Pick - это утилитарный тип, который берет из интерфейса значения
	// и создает из них новый интерфейс:
	// из Router берем только 'get' | 'post' | 'delete' | 'patch' | 'put'
	// keyof используется чтобы из интерфейса Pick<...> получить ключи
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	// Возможна запись ниже, но без гарантии соответствия возможным методам
  // Ошибка в написании метода приведет к ошибке в Runtime
	// method: 'get' | 'post' | 'delete' | 'patch' | 'put';
}
```

6. Связывание контекста:
   Адресация проблемы потери контекста `this` через `.bind(this)`, гарантируя, что контекст внутри функций сохраняется.

```TypeScript
	// bindRoutes() принимает массив роутов
	// и связывает их с функциями в контроллере
	// protected т.к. мы можем вызывать из наследников
	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			// Логгируем все биндинги, для тестирования
			this.logger.log(`[${route.method}] ${route.path}`);
			// Чтобы не терять контекст выполнения функции
			// Сохраненяем контекст this и связываем с функцией
			// В данном случае это контекст контроллера
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
```

7. Утилитарные методы ответа:
   Создание оберток для удобной отправки HTTP-ответов, например, методы для создания (`201 Created`) и успешного выполнения (`200 OK`) ответов.

Полный код базового контроллера `src\common\base.controller.ts`

```TypeScript
import { Response, Router } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IControllerRoute } from './route.interface';
export { Router } from 'express';

export abstract class BaseController {
	private readonly _router: Router; // Доступ только через getter

	// В конструктор необходимо явно передать LoggerService
	// Logger используется чтобы показать что выполена инициализация
	constructor(private logger: LoggerService) {
		// Внутри Express есть Router() который позволяет создать инстанс
		// роутера для отдельного контроллера
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T) {
		res.type('application/json')
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response) {
		return res.sendStatus(201);
	}

	// bindRoutes() принимает массив роутов
	// и связывает их с функциями в контроллере
	// protected т.к. мы можем вызывать из наследников
	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			// Логгируем все биндинги, для тестирования
			this.logger.log(`[${route.method}] ${route.path}`);
			// Чтобы не терять контекст выполнения функции
			// Сохраненяем контекст this и связываем с функцией
			// В данном случае это контекст контроллера
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}

	// Приблизительный Шаблон bindRoutes
	// Вместо any нужно использовать типизацию
	// protected bindRoutesTemplate(routes: any[]) {
	// 	// В цикле пройти по всем роутам и выполнить
	// 	this.router.get('path', func);
	// }
}
```

## 3.5. Контроллер пользователей

Предыдущий код `src\users\users.ts` без контроллера (для сравнения):

```TypeScript
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
```

Реализация UserController, расширяющего базовый контроллер, для управления регистрацией и логином пользователя.

1. Шаги реализации:

   - Создание `src\users\users.controller.ts`
   - Экспортировать класс UserController, расширяющий BaseController.
   - В конструкторе класса вызвать метод `bindRoutes()` для привязки маршрутов регистрации и логина.

2. Методы UserController

   - Определить два метода: `login` и `register`.
   - В каждом методе обрабатывать запрос (request), ответ (response) и следующий обработчик (next) из Express.js.
   - Использовать методы базового класса для стандартных HTTP-ответов, например, `this.ok(response, message)`.

3. Регистрация маршрутов

   - В методе `bindRoutes()`, привязать пути `/register` и `/login` к соответствующим методам класса с использованием POST-запросов.

Файл `src\users\users.controller.ts`:

```TypeScript
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';

export class UserController extends BaseController {
	constructor(
		logger: LoggerService
	) {
		super(logger);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		// res используется для передачи контекста
		// ok утилитарный метод базового контроллера
		this.ok(res, 'Login...');
	}

	register(req: Request, res: Response, next: NextFunction) {
		// res используется для передачи контекста
		// ok утилитарный метод базового контроллера
		this.ok(res, 'Register...');
	}
}
```

4. Интеграция с приложением

   - Добавить экземпляр UserController в основной файл приложения (App.ts) через систему маршрутизации.
   - Применить зависимости, такие как LoggerService, для передачи в конструктор BaseController.

### Внедрение в App.ts:

1. Удалить старый файл `src\users\users.ts` с пользовательскими маршрутами.
2. Организовать `dependency injection`, передав экземпляр `UserController` в конструктор приложения.
3. Использовать `router` экземпляра `UserController` в системе маршрутизации приложения.

Старый код `src\app.ts`:

```TypeScript
    // Метод инициализации Маршрутов Routes
	useRoutes() {
		this.app.use('/users', userRouter);
	}
```

Новый код `src\app.ts`:

```TypeScript
    // Метод инициализации Маршрутов Routes
	useRoutes() {
		this.app.use('/users', this.userController.router); // Используем контроллер
	}
```

Измененный код D:\Projects\node_abc\bin-api\src\main.ts

```TypeScript
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';

async function bootstrap() {
	// Внедрение Зависимостей (Dependency Injection, DI)
	// Внедряем в App через конструктор зависимость от другого сервиса
	// В данном месте можно легко подменить реализацию LoggerService()
	const logger = new LoggerService();
	// Создание приложения с двумя зависимостями
	// 1. new LoggerService()
	// 2. new UserController(logger)
	const app = new App(logger, new UserController(logger));
	await app.init(); // Инициализация приложения
}

// Точка входа в приложение
bootstrap();
```

### Проверка работы:

1. Сборка и запуск приложения для валидации работы `UserController`.
2. Использование инструментов для тестирования API (например, Insomnia) для отправки запросов на регистрацию и логин.
3. Проверка корректности ответов сервера на эти запросы.

```shell
npm run build
npm start
http POST http://localhost:8000/users/login
http POST http://localhost:8000/users/register
```

```text
> npm start

> bin-api@1.0.0 start
> node ./dist/main.js

2025-05-03 09:54:14 INFO: [post] /register
2025-05-03 09:54:14 INFO: [post] /login
2025-05-03 09:54:14 INFO: Сервер запущен на http://localhost:8000

> http POST http://localhost:8000/users/login

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 10
Content-Type: application/json; charset=utf-8
Date: Sat, 03 May 2025 09:54:49 GMT
ETag: W/"a-yNswNkdS3YyYvQ68R3JbH2iJmqI"
Keep-Alive: timeout=5
X-Powered-By: Express

"Login..."
```

## 3.6. Обработка ошибок

Создание и использование фильтров исключений в API.
Созданию фильтров исключений для обработки ошибок с определенным статус-кодом и отправки соответствующих ответов пользователям или сервисам, обращающимся к API.

### Шаги реализации:

1. Инициализация фильтров:
   Создание инфраструктуры для фильтров исключений по аналогии с маршрутизацией (`useRoutes`).
   Реализация `useExceptionFilters` для подключения фильтров после роутов.

`src\app.ts`

```TypeScript
  ...
 	useExceptionFilters() {
		...
	}

	public async init() {
        // Запуск в правильном порядке
        // 1. Middleware (на данном этапе отсутствует)
        // 2. Routes Маршруты
        // 3. Exception Filters

        // На текущий момент есть Инициализация Маршрутов + Exception Filters
        // Важен порядок следования
        this.useRoutes();
        this.useExceptionFilters();
        ...
	}
  ...
```

2. Структура фильтра:
   В папке `errors` создается класс для фильтра исключений. Например, `ExceptionFilter`.
   Фильтр должен содержать метод `catch`, принимающий ошибку, запрос, ответ и функцию `next`.

3. Логирование и обработка исключений:
   Интеграция сервиса логирования в конструкторе фильтра.
   Используется метод `catch` для логирования ошибок и отправки ответов, включая статус-код.

4. Унификация через интерфейс:
   Определение интерфейса `IExceptionFilter` с методом `catch`, чтобы стандартизировать фильтры исключений.

`src\errors\exception.filter.interface.ts`

```TypeScript
import { NextFunction, Request, Response } from 'express';

// Общий интерфейс для всех фильтров в приложении содержит метод catch
export interface IExceptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
```

5. Гибкая обработка статус-кодов:
   Реализация класса `HttpError`, расширяющего стандартный класс ошибки, для включения статус-кода и сообщения об ошибке.
   Фильтры теперь могут возвращать соответствующие статус-коды, улучшая удобство взаимодействия с API.

`src\errors\http-error.class.ts`

```TypeScript
// HTTPError это расширенный класс от обычной ошибки Error
// Обычная практика создания кастомных классов ошибок
// Дополнительно добавляются statusCode и context?
export class HTTPError extends Error {
	statusCode: number;
	context?: string;

	constructor(statusCode: number, message: string, context?: string) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.context = context;
	}
}
```

Полная версия `src\errors\exception.filter.ts`

```TypeScript
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

// Все фильтры для единообразия реализуют общий интерфейс IExceptionFilter
// Чтобы был стандартный метод catch, которым можно что-то обработать
export class ExceptionFilter implements IExceptionFilter {
	logger: LoggerService;
	constructor(logger: LoggerService) {
		this.logger = logger;
	}

	// Метод catch, который ловит ошибку err: Error | HTTPError
	// HTTPError это расширенный класс от обычной ошибки Error
	// В HTTPError содержится дополнительная информация с кодом ошибки
	// HTTPError передаются из контроллера и более информативны для пользователей
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			// Логгирование ошибки HTTPError (ошибка имеет контекст и сообщение)
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			// Ответ пользователю, например 401 - неавторизован, 403 - недостаточно данных
			res.status(err.statusCode).send({ err: err.message });
		} else {
			// Логгирование обычной ошибки (ошибка имеет сообщение)
			this.logger.error(`${err.message}`);
			// Ответ пользователю
			res.status(500).send({ err: err.message });
		}
	}
}
```

6. Интеграция и тестирование:
   Интеграция фильтра исключений в приложение, используя `useExceptionFilters`.
   Тестирование обработки ошибок, имитируя исключения внутри контроллеров и проверяя ответы API.

`src\app.ts`

```TypeScript
import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
    app: Express; // Интерфейс приложения Express
    server: Server; // Используется стандартный 'node:http'
    port: number; // Порт может быть конфигурируемым
    logger: LoggerService; // Как зависимость
	userController: UserController; // Как зависимость
    exceptionFilter: ExceptionFilter; // Как зависимость

    // Реализация конструктора для будущих зависимостей
	constructor(
        logger: LoggerService,
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express(); // Создание экземпляра Express
        this.port = 8000; // Порт по умолчанию 8000

        // Не рекомендуется создавать инстанс в данном конструкторе поскольку
        // мы будем привязаны к единственному LoggerService() и это
        // не позволит изменить реализацию LoggerService() при тестировании
        // this.logger = new LoggerService();

        // Инстанс логгера передается как параметр конструктора
        // Логгер создается снаружи данного класса и внедряется как зависимость
        this.logger = logger; // Рекомендуется получить инстанс извне как зависимость
        this.userController = userController; // Получить инстанс извне как зависимость
        this.exceptionFilter = exceptionFilter; // Получить инстанс извне как зависимость
    }

    // Метод инициализации Маршрутов Routes
	useRoutes() {
		this.app.use('/users', this.userController.router); // Используем контроллер
	}

    // Можеть быть несколько Exception Filters
   	useExceptionFilters() {
        // Обязательно привязываем контекст фильтра this.exceptionFilter
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

    // Инициализация приложения при запуске
    // Это публичный метод, чтобы кто-то мог запустить его
    // App в перспективе можно отделить архитектурно от сервера Express
    // На текущий момент корневой класс App запускает сервер Express
	public async init() {
        // Запуск в правильном порядке
        // 1. Middleware (на данном этапе отсутствует)
        // 2. Routes Маршруты
        // 3. Exception Filters

        // На текущий момент есть Инициализация Маршрутов + Exception Filters
        // Важен порядок следования
        this.useRoutes();
        this.useExceptionFilters();
        // Создание сервера
		this.server = this.app.listen(this.port);
        // В данном месте будет добавлено логгирование
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
```

`src\main.ts`

```TypeScript
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

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
```

### Ключевые моменты:

Фильтры исключений позволяют эффективно обрабатывать ошибки и отправлять подходящие ответы.
Использование интерфейсов и наследования классов обеспечивает гибкость и расширяемость системы обработки ошибок.

```shell
npm run build
npm start
http POST http://localhost:8000/users/login
http POST http://localhost:8000/users/register
```

```text
> npm start

> bin-api@1.0.0 start
> node ./dist/main.js

2025-05-03 11:51:04 INFO: [post] /register
2025-05-03 11:51:04 INFO: [post] /login
2025-05-03 11:51:04 INFO: Сервер запущен на http://localhost:8000
2025-05-03 11:51:17 ERROR: [login] Ошибка 401: ошибка авторизации

-----------------------------------------------------------------

> http POST http://localhost:8000/users/login

HTTP/1.1 401 Unauthorized
Connection: keep-alive
Content-Length: 45
Content-Type: application/json; charset=utf-8
Date: Sat, 03 May 2025 11:51:17 GMT
ETag: W/"2d-ZsKL4B5+lRZUzS8eVsZuDMLJFgI"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "err": "ошибка авторизации"
}
```

## 4.1. Разбор DI и IOC

1. Определение и применение внедрения зависимостей (`Dependency Injection, DI`):

   - DI — это процесс передачи внешних зависимостей программному компоненту, упрощающий тестирование и управление зависимостями.
   - Примеры внедрения: через конструктор или внутри метода. Первый способ объединяет зависимость с классом во время создания объекта, второй — при вызове метода.

В данном подходе каждая зависимость отделяема и ее можно заменить или отдельно протестровать. Важно, что код получается легко модифицируемый не требуется инстанциировать каждую зависимость внутри компонента, создание зависимостей выполняется снаружи компонента.

Использование через конструктор:

```TypeScript
// Зависимость
export class B { ... }

export class A {
  private a: B;
  constructor(a: B) {
    // Внедрение зависимости в класс
    this.a = a;
  }
}
```

Использование через метод:
Если зависимость нужно использовать только внутри одного метода ее можно передавать только в этот метод и не использовать на уровне всего класса.

```TypeScript
// Зависимость
export class B { ... }

export class A {
  run(a: B) {
    // Использование зависимости в методе ...
  }
}
```

2. Понятие `Composition Root`:

   - Место в приложении, где собирается дерево зависимостей и определяются связи между компонентами.

```TypeScript
// Точка сбора всех зависимостей - Composition Root
async function bootstrap() {
  // Внедрение Зависимостей (Dependency Injection, DI)
	// Внедряем в App через конструктор зависимость от другого сервиса
	// В данном месте можно легко подменить реализацию LoggerService()
	const logger = new LoggerService();
	// Компоненту приложения App передается три зависимости
	// 1. new LoggerService()
	// 2. new UserController(logger)
	// 3. new ExceptionFilter(logger)
	const app = new App(
		logger,
		new UserController(logger),
		new ExceptionFilter(logger)
	);
}
```

3. Работа с интерфейсами и подмена зависимостей:

   - Использование интерфейсов позволяет заменять конкретные реализации зависимостей на альтернативные, что упрощает тестирование и улучшает гибкость кода.

`src\logger\logger.interface.ts`

```TypeScript
import { Logger } from 'tslog';

export interface ILogger {
	logger: unknown;
	log: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
}
```

`src\logger\logger.service.ts`

```TypeScript
import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';

// Абстракция логгера скрывает настройки конфигурации от пользователя
// Также имеется возможность дополнять функционал и расширять методы логгера
// например, отправка сообщений в другие сервисы: sentry / rollbar
// Интефейс ILogger - это некий контракт и мы должны обеспечить его реализацию
// LoggerService должен точно соответствовать описанию контракта ILogger
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		// В новой версии tslog конфигурирование логов происходит через шаблонную строку
		const loggerTemplate =
			"{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ";
		// Создание логгера

		this.logger = new Logger({
			prettyLogTemplate: loggerTemplate
		});
	}

	// log принимает аргументы неизвестного типа
	public log(...args: unknown[]) {
		this.logger.info(...args);
	}

	public error(...args: unknown[]) {
		// Возможны дополнительные Side эффекты:
		// например, отправка в sentry / rollbar
		this.logger.error(...args);
	}

	public warn(...args: unknown[]) {
		this.logger.warn(...args);
	}
}
```

В `src\app.ts` используем интерфейс `ILogger` вместо конкретной реализации:

```TypeScript
import { ILogger } from './logger/logger.interface';

export class App {
    ...
    // logger: LoggerService; // Зависимость - конкретная реализация
    logger: ILogger; // Зависимость должна удовлетворять контракту/интерфейсу

    // Реализация конструктора для будущих зависимостей
	constructor(
        // logger: LoggerService, // Конкретная реализация
        logger: ILogger, // Используем интрефейс вместо конкретной реализации
        ...
    ) {
      //...
    }
    ...
}
```

4. Инверсия управления (`Inversion of Control, IoC`) и принцип инверсии зависимостей (`Dependency Inversion Principle, DIP`):

   - `IoC` предлагает разделение компонентов системы для изоляции зависимостей.
   - `DIP` гласит, что модули высшего уровня не должны зависеть от модулей нижнего уровня.

5. Использование `IoC` контейнеров:

   - `IoC` контейнеры автоматизируют управление зависимостями, обеспечивая создание и внедрение нужных зависимостей без необходимости их явного создания программистом.
   - Преимущество контейнеров в том, что они упрощают управление зависимостями и могут использоваться для тестирования.

### Как работают IoC контейнеры (инверсия управления)

1. class A регистрируется в контейнере (обычно по уникальному токену и мы знаем, что class A удовлетворяет интерфейсу A).
2. Аналогично class B регистрируется в контейнере.
3. Когда в class A необходимо добавить зависимость в виде интерфейса B, контейнер автоматически создает экземпляр класса B и после этого этот экземпляр внедряется как зависимость в класс A т.к. он удовлетворяет интерфейсу B.
4. class A создается также контейнером автоматически до всех этих операций.
5. По сути у нас есть центральная точка в виде контейнера, который создает все экземпляры классов и контейнер понимает какие зависимости нужны конкретным классам, контейнер управляет созданием зависимостей и передачей их внутрь потребителей.

```text
  +-------------------------+
  |       IoC Контейнер     |  <-- центральная точка управления
  +-------------------------+
              |
              | регистрирует:
              v
   [A Token] -> class A (implements InterfaceA)
   [B Token] -> class B (implements InterfaceB)

              |
              | создаем A
              v
  +-------------------------+
  |       class A           |  <-- требует InterfaceB
  +-------------------------+
              ^
              | контейнер видит, что A нуждается в B
              |
  +-------------------------+
  |       class B           |  <-- создается автоматически
  +-------------------------+

Контейнер:
- управляет созданием всех зависимостей
- определяет, кто и что требует (по интерфейсам / мета-данным)
- внедряет зависимости в нужные классы

Итог:
- class A получает готовый экземпляр class B
- разработчик не заботится о создании вручную
```

### Паттерн Service Locator встречается в C#

Сначала происходит регистрация всех инстансов (сервисов) в контейнера, а затем мы вытаскиваем необходимый инстанс чтобы его использовать.
Service Locator считается больше антипаттерном, поскольку после того, как мы его внедряем, можно легко получать все зависимости и программист начинает `плохокодить` и вытаскивать в рандомных местах любые зависимости вместо того чтобы правильно построить дерево зависимостей.

## 4.2. Декораторы - Decorators

1. Применение декораторов:

   - Декораторы часто используются в TypeScript и представляют собой экспериментальную функцию.
   - В JavaScript декораторы находятся на стадии предложения, их реализация отличается от TypeScript.
   - Декораторы используются для метапрограммирования и передачи метаинформации в функции.
   - Синтаксис декоратора начинается с символа `@`, например: `@component`.

```TypeScript
@Component
export class A {
  // ...
}
```

В результате работы декоратора метаинформация о классе перейдет в какую-то функцию, где будет исполняться логика работы этого декоратора.

2. Типы декораторов:

   - Декоратор класса @Component: добавляет метаинформацию для класса.
   - Декоратор свойства @Prop: применяется к свойствам класса.
   - Декоратор метода @Method: используется для методов класса.
   - Декоратор параметра @Param: применяется к параметрам метода класса.

```TypeScript
@Component
export class A {
  @Prop
  myName: string;

  @Method
  setName(@Param name: string) {
    this.myName = name;
    // ...
  }
}
```

3. Порядок выполнения декораторов:

   Декораторы инициализируются сверху вниз, но исполняются в обратном порядке.

4. Создание декоратора:

   Декораторы являются функциями, которые могут принимать параметры и изменять поведение класса, его свойств или методов.

```TypeScript
function Logger() {
  // ...
}

@Logger
@Component
export class A {
  @Prop
  myName: string;

  @Method
  setName(@Param name: string) {
    this.myName = name;
    // ...
  }
}
```

5. Примеры использования:

   - Декоратор класса: Может использоваться для логирования или инициализации компонентов.
   - Декоратор метода: Позволяет модифицировать результаты работы метода, например, умножая возвращаемое значение на 10.
   - Декоратор свойства: Можно использовать для создания кастомных геттеров и сеттеров.
   - Декоратор параметра: Предоставляет возможность взаимодействовать с конкретными параметрами методов.

`src\test.js`

```TypeScript
// Декоратор класса - это функция, которая принимает один параметр target
// Класс в JS - это синтаксический сахар
// Функция Component будет исполняться в момент инициализации класса
function Component(target: Function) {
    // Используем для тестирования момента инициализации
    console.log(target);
}

// Пример простого класса с одним свойством
@Component
export class User {
    id: number;

    updateId(newId: number) {
        this.id = newId;
        return this.id;
    }
}
```

Класс еще нигде не используется, но при запуске `test.js` мы получаем target:
При запуске кода происходит инициализация декоратора, фактически это вызов функции `Component`.

```Text
[class User]
```

Декораторы можно использовать с параметрами, например, мы хотим передать начальный id:

```TypeScript
// Декоратор класса - это функция, которая принимает один параметр target
// Класс в JS - это синтаксический сахар
// Функция Component будет исполняться в момент инициализации класса
function Component(id: number) {
    console.log('Init Component...');
    // Возвращаем другую функцию в процессе инициализации
    return (target: Function) => {
        console.log('Run Component...');
        target.prototype.id = id;
        // ...
    }
}

function Log() {
    console.log('Init Log...');
    // Возвращаем другую функцию в процессе инициализации
    return (target: Function) => {
        console.log('Run Log...');
        // ...
    }
}

// Декоратор метода принимает параметры:
// target: Object
// Ключ свойства (название метода) - propertyKey: string
// propertyDescriptor: PropertyDescriptor
function Method(
    target: Object,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
) {
    // Проверка какой метод вызван
    console.log(propertyKey);
    // Изменение метода, который декорируется propertyDescriptor.value
    // Часто исходная реализация метода сохраняется
    const oldValue = propertyDescriptor.value;
    // Пример универсального декоратора для любого кол-ва аргументов
    propertyDescriptor.value = function (...args: any[]) {
        // Пример вызов сохраненного исходного метода
        // oldValue();
        // ...
        // Предположим, что неважно что делает исходный метод
        // Пример умножения на 10 аргумента
        // Нужно осторожно применять такие операции
        // Нет гарантии, что args[0] число, рекомендуется выполнять проверку
        return args[0] * 10;
    }
}

// Пример простого класса с одним свойством
@Log()
@Component(1)
export class User {
    id: number;

    @Method
    updateId(newId: number) {
        this.id = newId;
        return this.id;
    }
}

console.log(new User().id);
console.log(new User().updateId(2));
```

Инициализация декораторов сверху вниз, исполнение в обратном порядке.

```Text
updateId
Init Log...
Init Component...
Run Component...
Run Log...
1
20
```

Пример использования декоратора свойства `@Prop`
и декоратора параметра метода `@Param`

```TypeScript

// Декораторы
console.log('-- Декораторы --');
// Декоратор класса - это функция, которая принимает один параметр target
// Класс в JS - это синтаксический сахар
// Функция Component будет исполняться в момент инициализации класса
function Component(id: number) {
    console.log('Init Component...');
    // Возвращаем другую функцию в процессе инициализации
    return (target: Function) => {
        console.log('Run Component...');
        target.prototype.id = id;
        // ...
    }
}

function Log() {
    console.log('Init Log...');
    // Возвращаем другую функцию в процессе инициализации
    return (target: Function) => {
        console.log('Run Log...');
        // ...
    }
}

// Декоратор метода принимает параметры:
// target: Object
// Ключ свойства (название метода) - propertyKey: string
// propertyDescriptor: PropertyDescriptor
function Method(
    target: Object,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
) {
    // Проверка какой метод вызван
    console.log(propertyKey);
    // Изменение метода, который декорируется propertyDescriptor.value
    // Часто исходная реализация метода сохраняется
    const oldValue = propertyDescriptor.value;
    // Пример универсального декоратора для любого кол-ва аргументов
    propertyDescriptor.value = function (...args: any[]) {
        // Пример вызов сохраненного исходного метода
        // oldValue();
        // ...
        // Предположим, что неважно что делает исходный метод
        // Пример умножения на 10 аргумента
        // Нужно осторожно применять такие операции
        // Нет гарантии, что args[0] число, рекомендуется выполнять проверку
        return args[0] * 10;
    }
}

// Декоратор свойства
function Prop(
    target: Object,
    propertyKey: string
) {
    let value: number;

    const getter = () => {
        console.log('Getter ...');
        return value;
    }

    const setter = (newValue: number) => {
        console.log('Setter ...');
        value = newValue;
    }

    // Переопределение get и set
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    });
}

// Декоратор параметра метода
function Param(
    target: Object,
    propertyKey: string,
    index: number
) {
    // index - порядковый номер аргумента, начиная с 0
    console.log(propertyKey, index);
}

// Пример простого класса с одним свойством
@Log()
@Component(1)
export class User {
    @Prop id: number;

    @Method
    updateId(@Param newId: number) {
        this.id = newId;
        return this.id;
    }
}

console.log(new User().id);
console.log(new User().updateId(2));
```

```shell
npm run build
node dist\test.js
```

```Text
updateId 0
updateId
Init Log...
Init Component...
Run Component...
Setter ...
Run Log...
Getter ...
1
20
```

6. Применение в `Dependency Injection (DI)`:

   Декораторы обеспечивают эффективный механизм для реализации системы DI, позволяя определять и управлять зависимостями в приложениях.

## 4.3. Metadata Reflection

1. Metadata Reflection

   - Основа: `Metadata Reflection` является ключевой составляющей систем Dependency Injection в таких фреймворках, как `Inversify`.
   - Библиотека `Reflect Metadata`: Используется для реализации `Metadata Reflection`, позволяет работать с метаданными объектов. Библиотека `Reflect Metadata` используется в Nest.js и других фреймворках.

2. Работа с Reflect Metadata

- Определение метаданных: Используется `Reflect.defineMetadata` для сохранения метаданных с ключом `a` и значением `1` на определенном таргете (класс, метод). Важно: ключ и значение относятся к определенному `target`! В качестве `target` может быть класс, метод и т.д. По сути мы сохраняем в некотором объекте связь между `target` и дополнительными метаданными.

```TypeScript
Reflect.defineMetadata('a', 1, target);
```

- Получение метаданных: Для извлечения данных используется `Reflect.getMetadata`.

```TypeScript
const meta = Reflect.getMetadata('a', target); // В meta получим значение 1
```

- Важность для Dependency Injection: Хранение и получение метаданных позволяет корректно реализовать dependency injection.

Фиксация метаданных может выполняться автоматически для декораторов таких паттернов как:

```Text
design:type
design:paramtypes
design:returntype
```

Дополнительную информацию `MetaData Proposal - ECMAScript` можно посмотреть на сайте:

https://rbuckton.github.io/reflect-metadata/

Эти методы реализуются в библиотеке `reflect-metadata`

3. Пример и применение в коде

   - Установка Reflect Metadata: Необходимо выполнить `npm install reflect-metadata`.
   - Создание и использование декораторов: Декораторы определяются с помощью функций, которые манипулируют метаданными через Reflect Metadata.

Используем декоратор @Test для тестирования метаданных

```TypeScript
import 'reflect-metadata'

@Test
class C {
  @Prop prop: mumber;

  @Method
  method() {
    // ...
  }
}
```

4. Технические аспекты

   - Конфигурация TypeScript: Необходимо включить поддержку декораторов и метаданных через `tsconfig.json`.

```json
    /* Enable experimental support for legacy experimental decorators. */
    "experimentalDecorators": true,

    /* Emit design-type metadata for decorated declarations in source files. */
    "emitDecoratorMetadata": true,
```

`emitDecoratorMetadata` - параметр, который необходим для проверки типов в Runtime, без включения этого параметра мы полностью потеряем информацию о типах при компиляции из TypeScript в JavaScript. Можно проанализировать результат компиляции когда этот параметр включен или выключен. Обязательно необходимо включить этот параметр для правильного использования Dependency Injection в библиотеках базирующихся на использовании метаданных.

- Практическое использование: Как метаданные используются для определения связей между классами и объектами.

Данный код можно использовать для анализа результатов компиляции в JavaScript:

`src\testmeta.ts`

```TypeScript
// Декоратор
function Test(target: Function) {
    // Сохраняем свойства
    // Используем глобальный NameSpace Reflect
    // a - ключ
    // 1 - значение, которое мы передаем и сохраняем
    // target - цель на которую будем триггериться при сохранении
    // Сохраняем свойства для target
    Reflect.defineMetadata('a', 1 ,target);

    // meta - данные, определяются для конкретного объекта
    // Объектом может служить класс, метод, свойство, параметр
    // Получение свойства по ключу из цели target
    const meta = Reflect.getMetadata('a', target);
    console.log(`meta: ${meta}`);
}

@Test
class C {
  method() {
    // ...
  }
}
```

5. Получение типа данных в Runtime

   - Информация о типах: С использованием метаданных можно получать информацию о типах данных даже после компиляции TypeScript в JavaScript.
   - Пример: Как тип данных сохраняется и может быть извлечен через метаданные.

6. Dependency Injection в действии

   - Процесс DI: Процесс Dependency Injection, начиная от определения "инжектируемых" объектов до их использования в приложении.
   - Связь с Reflect Metadata: Как метаданные используются для управления зависимостями и инъекций.

Для работы DI строится дерево зависимостей, которое используется для дальнейшего управления зависимостями. Для управления деревом зависимостей используется `DI контейнер`.

Тестовый пример: `src\testmeta.ts`

```TypeScript
// Metadata Reflection
import 'reflect-metadata';

// Типизированный пример внедрения зависимостей (DI) с reflect-metadata:
//  - используются строгие типы (Constructor<T>),
//  - контейнер типобезопасен,
//  - зависимости автоматически разрешаются через @Inject.

// Особенности:
// ✅ Типобезопасность: target имеет строгий тип конструктора.
// ✅ Тип T передаётся через resolve<T>(key) и Injectable<T>.
// ✅ Масштабируемость: легко добавить третий, четвёртый уровень зависимостей.

// Универсальный тип конструктора
type Constructor<T = any> = new (...args: any[]) => T;

// DI контейнер
class Container {
  private registry = new Map<string, Constructor>();

  register<T>(key: string, target: Constructor<T>) {
    this.registry.set(key, target);
  }

  resolve<T>(key: string): T {
    const target = this.registry.get(key);
    if (!target) {
      throw new Error(`No provider registered for key "${key}"`);
    }

    // Получаем типы параметров конструктора
    const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', target) || [];

    // Получаем ключи для инъекций (если есть)
    const injectKeys: (string | undefined)[] = Reflect.getMetadata('custom:injectKeys', target) || [];

    // Рекурсивно резолвим зависимости
    const params = paramTypes.map((_: any, index: number) => {
      const depKey = injectKeys[index];
      if (!depKey) {
        throw new Error(`Missing injection key for parameter index ${index} in ${target.name}`);
      }
      return this.resolve(depKey);
    });

    return new target(...params);
  }
}

// Создаём контейнер
const container = new Container();

// Декоратор класса
function Injectable<T>(key: string) {
  return (target: Constructor<T>) => {
    container.register(key, target);
  };
}

// Декоратор параметра конструктора
function Inject(key: string) {
  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    const existingInjectedKeys: (string | undefined)[] =
      Reflect.getMetadata('custom:injectKeys', target) || [];
    existingInjectedKeys[parameterIndex] = key;
    Reflect.defineMetadata('custom:injectKeys', existingInjectedKeys, target);
  };
}

// Простой сервис A
// Декоратор использует ключ KeyA для связи с class A (target)
// Связь ключ + target необходима для постоения дерева зависимостей
@Injectable('KeyA')
class A {
  method() {
    console.log('A.method() invoked');
  }
}

// Сервис B зависит от A
// Декоратор использует ключ KeyB для связи с class B (target)
@Injectable('KeyB')
class B {
  // Класс B в конструкторе принимает объект класса A
  // В данном месте может быть подставлен @Injectable объект,
  // Автоматически работает механизм DI
  constructor(@Inject('KeyA') private a: A) {}

  method() {
    console.log('B.method() invoked');
    // Вызов метода из зависимости A
    this.a.method();
  }
}

// Пример использования

// Что делает этот пример:
// @Injectable регистрирует класс в контейнере по ключу.
// @Inject сохраняет ключ зависимости, соответствующий параметру конструктора.

// Container.resolve:
// - ищет нужный класс по ключу;
// - определяет типы его зависимостей;
// - получает ключи для инъекций;
// - рекурсивно разрешает все зависимости;
// - создает экземпляр класса с подставленными зависимостями.

// Можно расширить этот механизм до синглтонов, скоупов,
// отложенной загрузки и circular dependencies.

const bInstance = container.resolve<B>('KeyB');
bInstance.method();
// B.method() invoked
// A.method() invoked
```

### Пример с InversifyJS `src\testinversify.ts`

Установка InversifyJS:

```shell
npm install inversify reflect-metadata
```

Проверка включения поддержки метаданных в `tsconfig.json`:

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

Код

```TypeScript
// inversify-example.ts
import 'reflect-metadata';
import { injectable, inject, Container } from 'inversify';

// Идентификаторы (можно использовать Symbol или строки)
const TYPES = {
  A: Symbol('A'),
  B: Symbol('B'),
};

@injectable()
class A {
  run() {
    console.log('A.run()');
  }
}

@injectable()
class B {
  constructor(@inject(TYPES.A) private a: A) { }

  run() {
    console.log('B.run()');
    this.a.run();
  }
}

const container = new Container();
container.bind<A>(TYPES.A).to(A);
container.bind<B>(TYPES.B).to(B);

// Получаем экземпляр
const b = container.get<B>(TYPES.B);
b.run();
```

### Пример с tsyringe

Установка:

```bash
npm install tsyringe reflect-metadata
```

Код:

```TypeScript
// tsyringe-example.ts
import 'reflect-metadata';
import { container, injectable, inject } from 'tsyringe';

@injectable()
class A {
  run() {
    console.log('A.run()');
  }
}

@injectable()
class B {
  constructor(@inject('A') private a: A) {}

  run() {
    console.log('B.run()');
    this.a.run();
  }
}

// Регистрируем A под именем "A"
container.register('A', { useClass: A });

// Резолвим B
const b = container.resolve(B);
b.run();
```

```shell
npm run build
node dist\testtsyringe.js
```

Результат:

```Text
B.run()
A.run()
```

### Сравнение DI `InversifyJS` vs `tsyringe`:

Оба решения не используются в NestJS. В NestJS есть свой DI.

```Text
                      | InversifyJS         | tsyringe
Явная регистрация     |  bind()             | register() или auto
Идентификаторы        |  Symbol, TYPES      | строки
Требует контейнер     |  Да (new Container) | Нет (глобальный container)
Поддержка scoping     |  ✅                 | ⚠️ (ограничено)
```

## 4.4. Внедрение InversifyJS

1. Установка InversifyJS

```shell
npm install inversify
```

`package.json`

```json
{
  ...
  "dependencies": {
    "express": "^5.1.0",
    "inversify": "^7.5.1",
  }
  ...
}
```

2. Символы для связывания

   - Создать файл `types.ts` для хранения символов
   - Символы уникальны и используются для связывания компонентов
   - Пример символов: `Application`, `LoggerService`, `UserController`, `ExceptionFilter`

`src\types.ts`

Уникальные символы всех компонентов проекта, которые будут связываться:

```TypeScript
export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'), // Связь через интерфейс, наименование как у интерфеса
	UserController: Symbol.for('UserController'),
	ExeptionFilter: Symbol.for('ExceptionFilter')
}
```

3. Создание контейнера

   - Использовать `main.ts` для агрегации `Dependency Injection`
   - Создать контейнер `AppContainer` с помощью `Inversify.js`
   - Контейнер - это место для хранения и переиспользования биндингов

Код `src\main.ts` до использования Inversify.js

```TypeScript
import { ExceptionFilter } from './errors/exception.filter';

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
```

4. Биндинг компонентов

Для каждого компонента (например, `ILogger`) выполнить биндинг с его реализацией (например, `LoggerService`). Использовать соответствующий символ `TYPES.ILogger` для связывания.

Новый код `src\main.ts` с использованием Inversify.js

```TypeScript
import { App } from './app';
import { Container } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { TYPES } from './types';

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
```

5. Использование декораторов

Используем декоратор `@injectable` для указания классов, которые можно помещать в контейнер:

```TypeScript
// Декоратор @injectable говорит, что LoggerService можно положить в конейнер
@injectable()
export class LoggerService implements ILogger { ... }
```

Использование декоратора `@inject` для внедрения зависимостей по определенному символу:

```TypeScript
// Декоратор @injectable говорит, что ExceptionFilter можно положить в конейнер
@injectable()
export class ExceptionFilter implements IExceptionFilter {
	// logger: LoggerService;
	// Явное использование зависимости необходимо заменить на @inject
	// constructor(logger: LoggerService) {
	// 	this.logger = logger;
	// }

	// Декоратор @inject принимает ключ TYPES.ILogger для внедрения зависимости
	// Управлять зависимостями будет inversify
	constructor(@inject(TYPES.ILogger) private logger: ILogger) { }

  ...
}
```

6. Получение экземпляров из контейнера

   - Использовать метод `get` контейнера для получения экземпляров по символам
   - Позволяет получить приложение и другие компоненты для инициализации

```TypeScript
const app = appContainer.get<App>(TYPES.Application);
```

7. Экспорт и инициализация

   - Инициировать приложение с помощью `app.init()`
   - Экспортировать `app` и `app.container` для дальнейшего использования, например, в тестах

```TypeScript
const app = appContainer.get<App>(TYPES.Application);
// Точка входа в приложение
app.init();

// В дальнейшем понадобятся для тестов экземпляры приложения и контейнера
export { app, appContainer };
```

### Преимущества использования InversifyJS

Возможность легко получать и переиспользовать экземпляры через контейнер
Упрощение управления зависимостями и их инжектирования
В тестах можно заменять реализации, делая код более гибким и тестируемым

### Важно:

Для корректной работы декораторов и зависимостей необходимо использовать `Reflect-metadata`
Проверка и обновления импортов `Reflect-metadata` там, где используются декораторы

Везде, где используются декораторы `@injectable` и `@inject` необходимо добавить `import 'reflect-metadata';` (в новых версиях библиотеки InversifyJS не обязательно).

Проверка приложения:

```shell
npm run build
npm start
http POST http://localhost:8000/users/login
http POST http://localhost:8000/users/register
```

```text
> npm run build

> bin-api@1.0.0 build
> tsc


> npm start

> bin-api@1.0.0 start
> node ./dist/main.js

2025-05-07 13:12:53 INFO: [post] /register
2025-05-07 13:12:53 INFO: [post] /login
2025-05-07 13:12:53 INFO: Сервер запущен на http://localhost:8000
2025-05-07 13:15:27 ERROR: [login] Ошибка 401: ошибка авторизации

---------------------------------------------

> http POST http://localhost:8000/users/login
HTTP/1.1 401 Unauthorized
Connection: keep-alive
Content-Length: 45
Content-Type: application/json; charset=utf-8
Date: Wed, 07 May 2025 13:15:27 GMT
ETag: W/"2d-ZsKL4B5+lRZUzS8eVsZuDMLJFgI"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "err": "ошибка авторизации"
}
```

## 4.5. Улучшение DI

1. Пример создания биндингов на интерфейсе.
2. Функция bootstrap для выделения логики сборки.
3. Пример создания интерфейса для User-контроллера.

### Модульный подход

- Приложения имеют тенденцию к росту, что усложняет управление зависимостями.
- Inversify позволяет использовать `container-module` для группировки и переиспользования зависимостей, похоже на Angular и NestJS.
- Пример создания `container-module (app-bindings)` для объединения зависимостей.
- Модули позволяют логически структурировать зависимости, облегчая разработку и поддержку приложения.

### Функция bootstrap

- Возвращаем важную функцию `bootstrap` для организации процесса инициализации приложения.
- В функции `bootstrap` создается контейнер приложения и загружаются необходимые биндинги через метод `.load()`.
- Преимущества разделения зависимостей на модули при инициализации приложения.

Пример изменений `src\main.ts`:

```TypeScript
import 'reflect-metadata';
import { App } from './app';
import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { TYPES } from './types';

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
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
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
```

### Практический пример - User-контроллер

- Создание интерфейса `IUserController` с методами `login` и `register`.
- Интеграция интерфейса с User-контроллером для демонстрации применения биндингов к интерфейсам.
- Проверка работоспособности изменений и её влияние на обработку запросов.

## 5.1. Eslint и Prettier

ESLint, TypeScript ESLint и Prettier для стандартизации и автоматизации форматирования кода в проекте.

https://eslint.org/

https://typescript-eslint.io/
https://github.com/typescript-eslint/typescript-eslint

https://prettier.io/

1. ESLint и Prettier

   - ESLint помогает стандартизировать стиль кода, особенно в командной разработке. Например, поcтавить точки с запятой (при отсутствии), обязательно ли должна присутствовать запятая... ESLint рекомендуется добавлять в Pipeline сборки приложения (build pipeline). Часто используется перед CodeReview.
   - Prettier автоматически форматирует код по заданным правилам.

2. Установка зависимостей

   - Установить ESLint, TypeScript ESLint (парсер и плагин), Prettier, ESLint-Prettier конфиг и плагин.
   - Добавить TypeScript, если он не установлен в проекте.

```bash
npm i -D eslint
npm i -D @typescript-eslint/parser
npm i -D @typescript-eslint/eslint-plugin
npm i -D prettier
npm i -D eslint-config-prettier
npm i -D eslint-plugin-prettier
npm i -D typescript
```

Внесены изменения в `package.json`

```json
  "devDependencies": {
    "@types/express": "^5.0.1",
    "@typescript-eslint/eslint-plugin": "^8.32.0",
    "@typescript-eslint/parser": "^8.32.0",
    "eslint": "^9.26.0",
    "eslint-config-prettier": "^10.1.3",
    "eslint-plugin-prettier": "^5.4.0",
    "prettier": "^3.5.3",
    "typescript": "^5.8.3"
  }
```

3. Настройка конфигураций

   - Создать и настроить `.prettierrc` для Prettier.
   - Создать и настроить `.eslintrc.json` для ESLint.

`.prettierrc`

```json
{
  "singleQuote": true,
  "trailingComma": "none",
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true,
  "printWidth": 100,
  "endOfLine": "auto"
}
```

Пояснение:

```Text
Опция       | Значение | Описание
useTabs     | false    | Использовать пробелы вместо табуляции.
tabWidth    | 2        | Количество пробелов, используемых для отступа.
singleQuote | true     | Использовать одинарные кавычки.
semi        | true     | Всегда ставить точку с запятой.
printWidth  | 100      | Максимальная длина строки до переноса.
endOfLine   | "auto"   | Автоматически подбирать формат переноса строк в зависимости от ОС.
```

Что делает trailingComma:
"none" - ❌ Не ставит запятую в конце
"es5" - ✅ Ставит запятые в объектах/массивах (ES5), но не в функциях
"all" (по умолчанию) - ✅ Везде, включая аргументы функций

4. Интеграция с IDE и автоматическое форматирование

   - Для VSCode создать папку `.vscode` и в ней файл `settings.json` для настройки автоматического форматирования.
   - Настроить авто-формат при сохранении файла.

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "eslint.useFlatConfig": true,
  "eslint.validate": ["typescript", "javascript"],
  "eslint.alwaysShowStatus": true
}
```

5. Добавление скриптов для линтинга и автофиксов в `package.json`

   - Добавить скрипт для запуска ESLint (`lint` и `lint:fix`).

```json
  "scripts": {
    ...
    "lint": "eslint ./src/**",
    "lint:fix": "eslint ./src/** --fix",
    ...
  },
```

6. Управление типами данных и типизация функций

   - Настроить правила для типизации возвращаемых функцией типов.
   - Пример использования явной типизации для улучшения читаемости и отлова ошибок.

```js
...
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off' // выключить проверку
      // '@typescript-eslint/explicit-function-return-type': 'warn' // включить предупреждения
    }
```

7. Тестирование и запуск проекта

   - Запустить линтинг и автофикс, убедиться в отсутствии ошибок.
   - Проверить сборку и запуск проекта.

Только проверка

```shell
npm run lint
```

Исправление ошибок

```shell
npm run lint:fix
```

Пример ручного исправления для возвращаемого типа `function bootstrap()` добавляем интерфейс, интерфейс обычно добавляют в отдельный файл, но можно и в исходном файле `src\main.ts`:

```TypeScript
export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

function bootstrap(): IBootstrapReturn { ... }
```

### Pipeline сборки приложения

Pipeline сборки приложения (build pipeline) — это набор автоматических шагов, которые выполняются для сборки, тестирования и подготовки приложения к запуску или публикации.

Он может быть простым (например, компиляция TypeScript → JavaScript), а может включать сложные этапы: линтинг, юнит-тесты, сборку Docker-образов, деплой и т.д.

При детектировании ошибок на этапе линтинга, Pipeline останавливается и деплой не выполняется.

#### Типичный pipeline включает:

1. Установка зависимостей
   `npm install` или `yarn install`

2. Линтинг и форматирование кода
   `eslint`, `prettier`, `tslint` — проверка стиля и ошибок

3. Тестирование
   Запуск `unit/integration` тестов: `jest`, `mocha`, `vitest`

4. Сборка проекта
   Например: `tsc` (TypeScript), `webpack`, `esbuild`, `vite`, `rollup`

5. Бандлинг и минификация
   Объединение JS/CSS в один файл и сжатие кода

6. Создание Docker-образа (если используется)

7. Развертывание (деплой)
   На сервер, в облако, CI/CD и т.д.

#### Где это используется?

1. Локально: разработчик запускает `npm run build`

2. CI/CD-система (например GitHub Actions, GitLab CI, Jenkins, Azure Pipelines) автоматически запускает pipeline при коммите

#### Пример для Node.js / TypeScript проекта

```bash
# 1. Установка зависимостей
npm ci

# 2. Линтинг
npm run lint

# 3. Тесты
npm test

# 4. Сборка
npm run build
```

Или автоматизировано в `.github/workflows/ci.yml` (GitHub Actions):

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

ESLint обычно используется до Code Review, чтобы автоматически найти и устранить ошибки или несоответствия в коде, прежде чем человек начнёт его проверять.

### Зачем использовать ESLint перед Code Review?

1. Автоматическая проверка кода

   - Обнаруживает синтаксические ошибки, баги и антипаттерны.
   - Проверяет соблюдение кодстайла (например, отступы, кавычки, отсутствие any).

2. Ускоряет ревью

   - Ревьюверу не нужно указывать на каждую запятую или неправильный стиль — ESLint уже сделал это.
   - Остаётся фокусироваться на логике, архитектуре и бизнес-ошибках.

3. Унификация кода

   - Весь код в проекте становится единообразным независимо от разработчика.
   - Особенно важно в командной работе.

🔄 Типичный порядок

1. Разработчик пишет код
2. ✅ Прогоняет ESLint (часто автоматически через pre-commit hook или CI)
3. ✅ Исправляет замечания, если есть
4. 🧑‍💻 Создаёт Pull Request
5. 🔍 Проводится Code Review
6. ✅ Тестирование и merge

#### Как автоматизировать запуск ESLint?

Через скрипт:

```json
"scripts": {
  "lint": "eslint . --ext .ts,.js"
}
```

Через Git hook (например, `[lint-staged + husky]`):

```bash
npx husky add .husky/pre-commit "npx lint-staged"
Через CI (например, GitHub Actions):
```

```yaml
- run: npm run lint
```

Конфиг для 8 версии eslint:
`bin-api\.eslintrc`

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": ["warn"],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "useTabs": false,
        "tabWidth": 2,
        "semi": true,
        "trailingComma": "all",
        "bracketSpacing": true,
        "printWidth": 100,
        "endOfLine": "auto"
      }
    ]
  }
}
```

Конфиг для 9 версии eslint:

```JavaScript
// eslint.config.js
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module' // даже если проект CommonJS, это нужно для ESM-синтаксиса
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      prettier: prettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'none',
          bracketSpacing: true,
          printWidth: 100,
          endOfLine: 'auto',
          useTabs: false,
          tabWidth: 2
        }
      ],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn'
      // '@typescript-eslint/explicit-function-return-type': 'off' // выключить проверку
    }
  }
];
```

## 5.2. Подключение nodemon

Инструменты для автоматической пересборки и перезапуска при изменении кода.

1. Nodemon:
   нод-монитор для слежения за файлами и автоматического перезапуска сервера.

2. TS-node
   среда исполнения TypeScript на Node.js, позволяет запускать TypeScript код напрямую, без предварительной компиляции в JavaScript.

### Установка зависимостей

Установка nodemon и TS-node как dev-dependencies.

```shell
npm i -D nodemon
npm i -D ts-node
```

В результете установки будут добавлены скрипты:
node_modules\.bin\nodemon
node_modules\.bin\ts-node

### Конфигурация nodemon

Создать файл `nodemon.json` в корне проекта.

В файле указать:
`watch` папку - папку для мониторинга (например, `src`).
`ext` - расширения файлов для слежения (например, `ts`, `json`).
`ignore` - файлы или папки для игнорирования (например, тестовые файлы `.spec.ts`).
`exec` - команда запуска приложения (например, `ts-node src/main.ts`). Не требуется предварительная компиляция.

### Добавление скрипта для запуска в dev-режиме

В `package.json` добавить скрипт `dev` для запуска nodemon. Скрипт nodemon будет читать файл конфигурации `nodemon.json` в корне проекта и работать согласно настройкам из него.

```json
  "scripts": {
    ...
    "dev": "nodemon"
    ...
  }
```

### Проверка работы

Запустить приложение в dev-режиме с помощью `npm run dev`.
При изменении файлов в папке `src` nodemon автоматически перезапустит сервер.

### Преимущества

Ускоряет процесс разработки, избавляя от необходимости ручного перезапуска сервера.
TS-node обеспечивает выполнение TypeScript кода напрямую, при этом учитывая настройки из `tsconfig.json`.

```shell
npm run dev
http POST http://localhost:8000/users/login
# Во время работы делаем изменения в одном из файлов проекта
http POST http://localhost:8001/users/login
```

Во время работы делаем изменения в файле провекта `src\app.ts` (изменяем порт).
Сервер перезапустится автоматически.

```Text
> npm run dev

> bin-api@1.0.0 dev
> nodemon

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src\**\*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/main.ts`
2025-05-08 22:55:46 INFO: [post] /register
2025-05-08 22:55:46 INFO: [post] /login
2025-05-08 22:55:46 INFO: Сервер запущен на http://localhost:8000
2025-05-08 22:57:05 ERROR: [login] Ошибка 401: ошибка авторизации
[nodemon] restarting due to changes...
[nodemon] starting `ts-node ./src/main.ts`
2025-05-08 22:57:33 INFO: [post] /register
2025-05-08 22:57:33 INFO: [post] /login
2025-05-08 22:57:33 INFO: Сервер запущен на http://localhost:8001
2025-05-08 22:57:44 ERROR: [login] Ошибка 401: ошибка авторизации
```

## 5.3. Отладка - Debugging

Поиск и исправление багов.
Просмотр значений переменных, шаг за шагом анализ работы кода.

### Инструменты и подготовка:

1. `Source Map` для связи TypeScript и JavaScript кода.
   Включается в TS-конфиге.
   Создаёт `.map` файлы, указывающие соответствие строк TS и JS кодов.

Восстановить предыдущую версию файла tsconfig.json из Git

```shell
git checkout HEAD -- tsconfig.json
```

И создать файл для игнорирования `.prettierignore`

```Text
tsconfig.json
```

Добавить (или сделать активной) в tsconfig.json строку:

```json
"sourceMap": true, /* Create source map files for emitted JavaScript files. */
```

Теперь автоматически будут создаваться `.map` файлы, указывающие соответствие строк TS и JS кодов при выполнении компилиции:

```shell
npm run build
```

2. `Nodemon` для автоматического перезапуска приложения после изменений.
   Позволяет сохранять breakpoint'ы и продолжать отслеживать код после изменений.

### Настройка отладки в VS Code:

Пример создания файла `launch.json` для запуска отладки с Nodemon. Этот файл может не сработать, поскольку может отличаться путь к файлу `nodemon`, например:

`\node_modules\.bin\nodemon`
`\node_modules\nodemon\bin\nodemon.js`

Вариант 1. Файл конфигурации `launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "${workspaceFolder}/node_modules/nodemon/bin/nodemon.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

Вариант 2. Файл конфигурации `launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "command": "npm run dev",
      "name": "Run npm dev",
      "request": "launch",
      "type": "node-terminal"
    }
  ]
}
```

Если использовать автоматическое создание файла в VSCode, будет создан почти идентичный файл (для сравнения с вариантами выше).
Автоматическое создание файла `launch.json` для запуска с Nodemon.
Обратить внимание на строку конфигурации, которая отключена:
`// "program": "${workspaceFolder}/app.js", // не нужно в данном случае`

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "name": "nodemon",
      // Все параметры для запуска nodemon будет брать из nodemon.json
      // Строка сгенерирована автоматически VSCode при создании .vscode\launch.json
      // "program": "${workspaceFolder}/app.js", // не нужно в данном случае
      "request": "launch",
      "restart": true,
      "runtimeExecutable": "nodemon",
      "skipFiles": ["<node_internals>/**"],
      "type": "node"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${file}"
    }
  ]
}
```

Конфигурация включает:

- Тип выполнения (`Node.js`),
- Пути и параметры запуска,
- Автоматический перезапуск при изменениях.

В логе обратить внимание на строку `Debugger attached.`:

```Text
D:\Projects\node_abc\bin-api> cmd /C "set "NODE_OPTIONS= --require c:/VSCode/resources/app/extensions/ms-vscode.js-debug/src/bootloader.js  --inspect-publish-uid=http" && set "VSCODE_INSPECTOR_OPTIONS=:::{"inspectorIpc":"\\\\.\\pipe\\node-cdp.24920-338388a4-5.sock","deferredMode":false,"waitForDebugger":"","execPath":"C:\\Program Files\\nodejs\\node.exe","onlyEntrypoint":false,"autoAttachMode":"always","fileCallback":"C:\\Users\\belok\\AppData\\Local\\Temp\\node-debug-callback-d7664cd5768dce9e"}" && d:\Projects\node_abc\bin-api\node_modules\.bin\nodemon.CMD
"
Debugger attached.
[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src\**\*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/main.ts`
Debugger attached.
2025-05-09 11:41:13 INFO: [post] /register
2025-05-09 11:41:13 INFO: [post] /login
2025-05-09 11:41:13 INFO: Сервер запущен на http://localhost:8000
```

### Процесс отладки:

1. Установка breakpoint'ов.
2. Запуск отладки через кнопку `Play` или клавишу `F5`.
3. Использование панели управления отладкой для шага по коду, просмотра переменных и стека вызовов.

### Возможности:

1. Мониторинг значений переменных и состояний.
2. Просмотр и управление точками останова.
3. Анализ стека вызовов и запросов.
4. Обнаружение исключений.

## 5.4. Анализ памяти

### Управление памятью и отладка утечек в Node.js + Chrome DevTools

Отладка утечек памяти и производительности в Node.js требует набора инструментов и методик. Chrome DevTools предоставляет мощные возможности для анализа памяти, профайлинга выполнения кода, исследования утечек, оптимизации производительности и управления ресурсами приложения.

### Запуск в дебаг-режиме

1. Включить дебаг-режим приложения для подключения различных утилит отладки.
2. Инструменты: Node.js, VS Code, Chrome-дебаггер.
3. Реализация: Создание команды `devinspect` для запуска приложения с параметром `inspect`, используя NodeMon, включение расширений `ts` и `json`, применение `tsNode` через параметр `-r` (регистрация обработчика).

`--inspect=localhost:9222` - используется порт 9222 вместо порта по умолчанию 9229 (Adobe иногда использует этот порт, это приводит к конфликтам)

```json
  "scripts": {
    ...
    "dev": "nodemon",
    "dev:inspect": "nodemon -e ts,json --exec node --inspect=localhost:9222 -r ts-node/register src/main.ts",
    ...
  }
```

### Пример использования Chrome DevTools для отладки

1. Открытие дебаггера: Используем Chrome для открытия специализированных DevTools для Node.js.

```shell
npm run dev:inspect
```

В браузере Chrome в панели разработчка включить `DevTools for Node.js`:
Open Dedicated DevTools for Node.js

Открыть DevTools
После запуска Node.js с `--inspect`, в терминале появится что-то вроде:

```nginx
Debugger listening on ws://localhost:9222/UUID
For help, see: https://nodejs.org/en/docs/inspector
```

Теперь можно:
Перейти в Chrome по адресу: `chrome://inspect`
Нажать "Configure" и убедиться, что там есть localhost:9222.
Нажать "Open dedicated DevTools for Node" — появится вкладка DevTools с подключением.

Для эксперимета `Поиск утечек памяти` немного модифицируем код `users.controller.ts`:
Перезапуск сервера должен произойти автоматически.

```TypeScript
// Временные объекты пользователей для экспериментов с памятью
class User {}
const users = [];
...

  login(req: Request, res: Response, next: NextFunction): void {
    ...
    // Для эксперимета `Поиск утечек` засоряем память пустыми объектами User()
    users.push(new User());
    ...
  }
```

2. Подключение к приложению: Устанавливаем соединение, указывая адрес `localhost`.

3. Анализ памяти и поиск утечек:

   - Создание и сравнение снапшотов памяти до и после выполнения операций.
     Сравнение при помощи DevTools на странице Memory необходимо отфильтровать объекты при помощи сравнения двух снапшотов: `Object allocated between Snapshot 2 and Snapshot 3`

   - Использование пользовательского кода для генерации "утечек" памяти путем добавления объектов к глобальной переменной.
   - Изучение изменений в распределении памяти для идентификации потенциальных утечек.

### Профайлинг выполнения кода

1. Стек вызовов и флейм графы:
   Создание и анализ флейм-графов, чтобы выявить узкие места в ресурсах CPU и памяти.

2. Методика:
   Запуск профайлинга перед выполнением запросов.
   Остановка и анализ результатов профайлинга для оптимизации производительности.

Оценка производительности выполняется на вкладке `Performance`.

### Отладка исходного кода

`Sources` и `Console` в `Chrome DevTools`: Изучение исходного кода, выполнение кода и просмотр логов в консоли.
Выполнение кода и быстрое выявление проблем.

## 5.5. Мониторинг производительности

### ClinicJS Doctor

- `ClinicJS Doctor` является частью набора инструментов `ClinicJS` для диагностики приложений Node.js.
- Позволяет анализировать утечки памяти, задержки в `Event Loop`, использование CPU и количество открытых соединений.
- Упрощает обнаружение проблем с производительностью и предоставляет рекомендации.

### Необходимые инструменты

https://clinicjs.org/

Глобальная установка `ClinicJS Doctor` и `autocannon` (имитатор нагрузки).

```shell
npm install -g clinic doctor autocannon
```

Отчет по установке:

```Text
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated har-validator@5.1.5: this library is no longer supported
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
npm warn deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm warn deprecated mkdirp@0.3.4: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)
npm warn deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142

added 765 packages in 45s
```

Подготовка примера: Добавление тяжелого файла в проект для демонстрации задержки `Event Loop`.

Необходими обновить `.gitignore` чтобы не засорять проект диагностическими файлами:

Добавить в `.gitignore`:

```Text
/.clinic
```

### Использование ClinicJS Doctor

1. Запуск на здоровом приложении:
   Использовать `ClinicJS Doctor` в связке с `autocannon` для анализа производительности.

```shell
clinic doctor --on-port 'autocannon -m POST localhost:8000/users/register' -- node dist/main.js
```

2. Анализ отчета:
   Просмотр показателей, таких как задержка `Event Loop`, использование CPU и памяти, количества активных обработчиков.

```Text
>clinic doctor --on-port 'autocannon -m POST localhost:8000/users/register' -- node dist/main.js
2025-05-09 15:30:37 INFO: [post] /register
2025-05-09 15:30:37 INFO: [post] /login
2025-05-09 15:30:37 INFO: Сервер запущен на http://localhost:8000
Running 10s test @ http://localhost:8000/users/register
10 connections


┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 1 ms │ 5 ms  │ 8 ms │ 1.23 ms │ 1.49 ms │ 42 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬────────┬────────┬─────────┬─────────┬─────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min    │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ Req/Sec   │ 3 979  │ 3 979  │ 6 163   │ 6 355   │ 5 925   │ 633,9  │ 3 978  │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ Bytes/Sec │ 983 kB │ 983 kB │ 1.52 MB │ 1.57 MB │ 1.46 MB │ 157 kB │ 983 kB │
└───────────┴────────┴────────┴─────────┴─────────┴─────────┴────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 11

65k requests in 11.04s, 16.1 MB read
Analysing data
Generated HTML file is file:///D:/Projects/node_abc/bin-api/.clinic/36332.clinic-doctor.html
```

3. Модификация приложения:
   Добавление кода, вызывающего утечки памяти и блокировку `Event Loop` для наглядной демонстрации проблем с производительностью.

Чтение большого файла синхронным способом, такой код приводит к блокировке основного потока.
Пример плохого кода в `src\users\users.controller.ts`:

```TypeScript
// Временные импорты для экспериментов с производительностью
import fs from 'fs';
import { resolve } from 'path';

// Будем использовать для экспериметров перерасхода памяти
const data = [];

...

  register(req: Request, res: Response, next: NextFunction): void {
    // Эксперимент для тестирования производительности
    // Синхронно читаем файл и блокируем Event Loop
    // __dirname является текущим каталогом, где находится файл
    // data.push() используется чтобы израсходовать большой объем памяти
    // Идеально плохой код для тестирования
    data.push(fs.readFileSync(resolve(__dirname, '../../Auf_dem_Markt.mp4')));

    // res используется для передачи контекста
    // ok утилитарный метод базового контроллера
    this.ok(res, 'Register...');
  }
...
```

4. Повторный запуск и анализ:
   Наблюдение за изменениями в показателях производительности и получение рекомендаций по устранению проблем.

### Анализ проблем приложения

1. Чтение большого файла синхронным методом:
   Приводит к блокировке `Event Loop`, замедляя обработку других запросов.
2. Хранение данных в памяти:
   Увеличение использования памяти и потенциальные утечки памяти.
3. Диагностика с `ClinicJS Doctor`:
   Позволяет наблюдать задержки в `Event Loop` и рекомендует дальнейшие шаги для углубленного анализа проблемы, например, использование `ClinicJS Flame` для визуализации `Flame Graph` и определения длительных операций.

```Text
> clinic doctor --on-port 'autocannon -m POST localhost:8000/users/register' -- node dist/main.js

2025-05-09 16:37:55 INFO: [post] /register
2025-05-09 16:37:55 INFO: [post] /login
2025-05-09 16:37:55 INFO: Сервер запущен на http://localhost:8000
Running 10s test @ http://localhost:8000/users/register
10 connections

┌─────────┬──────┬───────┬────────┬─────────┬───────────┬──────────┬─────────┐
│ Stat    │ 2.5% │ 50%   │ 97.5%  │ 99%     │ Avg       │ Stdev    │ Max     │
├─────────┼──────┼───────┼────────┼─────────┼───────────┼──────────┼─────────┤
│ Latency │ 5 ms │ 63 ms │ 917 ms │ 1656 ms │ 124.38 ms │ 253.3 ms │ 2423 ms │
└─────────┴──────┴───────┴────────┴─────────┴───────────┴──────────┴─────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 13      │ 13      │ 24      │ 176     │ 74,5    │ 69,07   │ 13      │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 3.21 kB │ 3.21 kB │ 5.93 kB │ 43.5 kB │ 18.4 kB │ 17.1 kB │ 3.21 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 10

755 requests in 10.1s, 184 kB read
Analysing data
Generated HTML file is file:///D:/Projects/node_abc/bin-api/.clinic/34988.clinic-doctor.html

Doctor has found a potential Event Loop issue:
There may be one or more long running synchronous operations blocking the thread
Mitigate: Implement HTTP 503 event-loop protection
Diagnose: Use clinic flame to discover CPU intensive function calls – run clinic flame -h
Use --trace-sync-io to track synchronous I/O operations
```

## 6.1. Улучшение архитектуры

Внесение дополнений к схеме архитектуры приложения.

### Добавленные Компоненты:

1. `DTO` (`Data Transfer Object`):

   - Служит для передачи данных между частями системы.
   - Позволяет организовать детерминированную валидацию данных с использованием декораторов.

2. `Middleware-валидация`:

   - Используется для валидации входящего `DTO` на корректность данных.
   - Примеры проверок: длина строки, формат email и др.

3. `Сервис`:

   - Представляет собой промежуточный слой между контроллером и репозиторием.
   - Отвечает за выполнение бизнес-логики.

4. `Entity` (Бизнес-единица):

   - Центрирован вокруг конкретного объекта (например, пользователя).
   - Содержит методы для работы с бизнес-логикой объекта (например, хеширование пароля).

### Процесс Работы:

Валидация данных:
Первоначально входящие данные (`DTO`) проходят через middleware, где происходит их валидация.

Обработка запроса:
Далее, контроллер обращается к сервису, который, в свою очередь, работает с `entity` для выполнения бизнес-логики.

Использование `Entity` и `DTO`:
Это дает возможность инкапсулировать работу с объектами и их валидацию, создавая четкую структуру обработки данных.

## 6.2. Data transfer object

Data Transfer Object (DTO) для использования в методах логина и регистрации.

### Создание DTO

1. Определение: DTO - это класс, представляющий данные, которые будут передаваться извне в контроллер. Теоретически эти объекты могут использоваться между контроллером и сервисами и т.д.
2. Размещение: DTO классы хранятся в отдельной папке DTO.
3. DTO - это классы для описания объектов, которые будут передаваться между различными частями системы.
4. Используются именно классы а не интерфейсы, потому что к ним в дальнейшем будут применяться декораторы.
5. В архитектуре CQRS при передаче данных (например, при создании пользователя), эти данные оформляются как объект определенного класса (`DTO`), и создаются через `new`. Данные должны содержаться внутри класса. `DTO` это по сути описание того, что будет приходить извне и попадать в контроллер.

### Преимущества архитектуры CQRS:

CQRS (Command Query Responsibility Segregation) паттерн, который часто используется вместе с DTO (Data Transfer Object).

- Позволяет проверить типы и структуру данных.
- Упрощает валидацию (можно встроить проверку внутрь конструктора или через декораторы).
- Делает код более читаемым и структурированным.

### Реализация

1. Создаются два класса: `UserLoginDto` и `UserRegisterDto`, оба содержат поля `email` и `password`. Для регистрации дополнительно добавляется поле `name`.
2. Если DTO очень похожи, можно использовать наследование для эффективности.
3. Например, можно создать базовый класс `UserCredentialDto`.

`users\dto\user-login.dto.ts`

```TypeScript
export class UserLoginDto {
  email: string;
  password: string;
}
```

`users\dto\user-register.dto.ts`

```TypeScript
export class UserRegisterDto {
  email: string;
  password: string;
  name: string;
}
```

### Использование DTO в контроллерах

1. По сути DTO это контракты на то, как будет приходить информация.
2. Типизация запроса: DTO используется для типизации тела запроса в контроллерах, упрощая обработку и валидацию данных.
3. Пример: В методах логина и регистрации используется соответствующий DTO для обработки данных пользователя.

Но если попытаться выполнить POST запрос на сервер и передать в BODY JSON:

```shell
http POST http://localhost:8000/users/register email=test@mail.com password=testpass
```

- HTTPie автоматически преобразует параметры ключ=значение в JSON, если используется http POST
- запрос будет отправлен с заголовком `Content-Type: application/json`

```http
POST /users/register HTTP/1.1
Content-Type: application/json
{
  "email": "test@mail.com",
  "password": "testpass"
}
```

Но мы не получим в результате DTO объект как планировали, причина - Express по умолчанию не умеет сериализовать BODY и не обрабатывает JSON.

`users\users.controller.ts`

```TypeScript
  // Третий параметр в Request<{}, {}, UserLoginDto> является ReqBody
  // ReqBody - это данные которые будут приходить методом POST UserLoginDto
  // в качестве body будем использовать DTO объект
  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body); // body будет UserLoginDto
    // req.body является UserLoginDto и его можно использоват далее как объект

    //...
  }
```

### Настройка Express для работы с JSON

Express по умолчанию не обрабатывает JSON в теле запроса, требуется установка и настройка `body-parser` как middleware для разбора JSON.

```shell
npm i body-parser
```

Парсеры могут также парсить XML, есть также FORM-парсеры.
Для JSON парсинга добавляем `useMiddleware()` в `app.ts`:

```TypeScript
...
import { json } from 'body-parser'; // Middleware для разбора JSON

@injectable()
export class App {
  app: Express; // Интерфейс приложения Express

  ...

  useMiddleware(): void {
    // Приложение (this.app) использует (this.app.use) Middleware
    this.app.use(json()); // Парсер BODY в JSON для всех запросов
  }

  // Метод инициализации Маршрутов Routes
  useRoutes(): void {
    this.app.use('/users', this.userController.router); // Используем контроллер
  }

  // Можеть быть несколько Exception Filters
  useExceptionFilters(): void {
    // Обязательно привязываем контекст фильтра this.exceptionFilter
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    // Запуск в правильном порядке
    // 1. Middleware
    // 2. Routes Маршруты
    // 3. Exception Filters

    // На текущий момент есть Middleware + Инициализация Маршрутов + Exception Filters
    // Важен порядок следования
    this.useMiddleware(); // Глобальный парсер BODY в JSON для всех запросов
    this.useRoutes();
    this.useExceptionFilters();
    // Создание сервера
    this.server = this.app.listen(this.port);
    // В данном месте будет добавлено логгирование
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
```

Тестирование

```shell
http POST http://localhost:8000/users/login email=test@mail.com password=testpass
```

Результат

```Text
> npm run dev
...

2025-05-09 22:39:15 INFO: [post] /register
2025-05-09 22:39:15 INFO: [post] /login
2025-05-09 22:39:15 INFO: Сервер запущен на http://localhost:8000
{ email: 'test@mail.com', password: 'testpass' }
```

### Валидация и безопасность

Текущее состояние принимает объекты без валидации, что может привести к ошибкам.

## 6.3. User entity

`Entity` в программировании – это класс, описывающий бизнес-объекты и их логику. Это ключевой компонент в DDD и `clean architecture` Роберта Мартина.
У класса Entity могут быть свои методы и свойства и внутри зашита бизнес-логика и бизнес-описания.

Пример: В системе продажи автомобилей, сам автомобиль может быть представлен как `Entity`.

### Особенности Entity

1. Изоляция от системы:
   Entity должна быть отделена от других системных элементов. Это означает, что ее реализация не зависит от баз данных, контроллеров или фреймворков.

2. Концентрация бизнес-логики:
   Вся бизнес-логика должна быть заключена в Entity. Это позволяет легко адаптироваться к изменениям в бизнес-требованиях. Пример бизнес-логики - получение ФИО пользователя одной строкой.

### Создание User Entity

1. Основные атрибуты:
   Для пользователя, например, нужны `email`, `пароль` и `имя`. Эти атрибуты задаются через конструктор класса.

2. Приватные поля и геттеры:
   Поля класса делаются приватными, с возможностью чтения их через геттеры. Пароль хешируется для безопасности.

3. Хеширование пароля:
   Используется библиотека `bcrypt.js` для безопасного хранения паролей. Пароль не сохраняется в открытом виде, а хешируется с помощью "соли".

Установка bcryptjs и types для bcryptjs

```shell
npm i bcryptjs
npm i -D @types/bcryptjs
```

Описание функции hash из библиотеки bcryptjs

```Text
(alias) hash(password: string, salt: number | string): Promise<string> (+1 overload)
import hash
Asynchronously generates a hash for the given password.
@param password — Password to hash
@param salt — Salt length to generate or salt to use
@return — Promise with resulting hash, if callback has been omitted
```

### Что такое мутабельный и немутабельный объект?

#### Мутабельный объект (`mutable`):

Это объект, состояние которого можно изменить после создания.

Пример:

```JavaScript
const user = { name: 'Alice' };
user.name = 'Bob'; // изменили имя — это мутабельность
```

#### Немутабельный объект (`immutable`):

Это объект, состояние которого нельзя изменить после создания. Чтобы "изменить" его, нужно создать новый объект.

Пример в котором создается новый объект updatedUser:

```JavaScript
const user = Object.freeze({ name: 'Alice' });
const updatedUser = { ...user, name: 'Bob' }; // user остался неизменным
user.name = 'Bob'; // Не сработает — в строгом режиме выбросит ошибку
```

- Object.freeze() делает объект user неизменяемым: нельзя изменить его свойства, удалить или добавить новые. Объект становится immutable (неизменяемым) — но только на верхнем уровне.
- updatedUser — это новый объект, на него freeze() не влияет, можно его изменять, если нужно.

Зачем это нужно?
Немутабельность делает код предсказуемее.

- Упрощает отладку и тестирование.
- Полезна при работе с состоянием (например, в React, Redux).
- Предотвращает ошибки от случайных изменений данных.

### Аналоги в TypeScript

TypeScript — это надмножество JavaScript, и `Object.freeze` в нём работает точно так же. Однако TypeScript предоставляет статические гарантии неизменяемости, которые могут быть более строгими, чем `Object.freeze`:

Тип `Readonly<T>`

```TypeScript
type User = {
  name: string;
};

const user: Readonly<User> = {
  name: 'Alice'
};

user.name = 'Bob'; // Ошибка компиляции — нельзя изменять
```

`Readonly<T>` — встроенный тип, который делает все свойства только для чтения на уровне типов.

Это работает во время компиляции, но не предотвращает изменения в рантайме (в отличие от `Object.freeze`).

### Глубокая иммутабельность (рекурсивно)

TypeScript не поддерживает `DeepReadonly<T>` из коробки, но можно реализовать самому:

```TypeScript
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
```

### Консистентный и неконсистентный объект

#### Консистентный объект:

Это объект, находящийся в допустимом и логически корректном состоянии.
Объект user консистентен если все поля заполнены корректно, например, может быть требование к наличию пароля определенной длины и с определенными символами.

#### Неконсистентный объект:

Это объект, у которого внутренние данные противоречат логике или правилам. Например, система позволяет создавать обхект пользователя без пароля, хотя есть требования к наличию пароля.

Класс `users\user.entity.ts` позволяет создавать неконсистентентные объекты без пароля, поскольку пароль устанавливается дополнительно после создания объекта пользователя.

```TypeScript
import { hash } from 'bcryptjs'; // Используем асинхронную функцию hash
// Также есть синхронная функция hashSync

// Иногда в именовании классов применяют слово Entity, например UserEntity
export class User {
  // Пароль хранится как хеш, недопустимо хранить пароль в открытом виде
  // Для него создается асинхронный метод public async setPassword
  // Нельзя создать setter т.к. setter не может быть асинхронным
  private _password: string;

  // Мы не можем менять объект Entity, после создания используем как есть.
  // Теоретически для модифицируемых полей могут быть setter-методы.
  // Конструктор в JavaScript и TypeScript не может быть асинхронным,
  // он не может быть помечен как async и не может использовать await внутри.
  constructor(
    private readonly _email: string,
    private readonly _name: string
  ) {}

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  // Нельзя создать setter т.к. setter не может быть асинхронным
  public async setPassword(pass: string): Promise<void> {
    // В дальнейшем вторым параметром будет соль, которая хранится в конфигурации
    // Сохраняем захешированный пароль
    this._password = await hash(pass, 10);
  }
}
```

Немутабельный и консистентный класс User в стиле DDD (Domain-Driven Design)
Как пример для сравнения с классом выше.

`users\userEntity.ts`

```TypeScript
import { hash } from 'bcryptjs';

// User entity (с приватным конструктором и фабрикой)
// немутабельный и консистентный класс User в стиле DDD (Domain-Driven Design)
// с readonly свойствами, без setter-ов и с асинхронным созданием.
// Пример, как можно правильно и безопасно создать пользователя
// с использованием асинхронного фабричного метода User.create(...)

// Преимущества такого подхода:
// ✔️ Хеширование пароля гарантировано.
// ✔️ Консистентные объекты (всегда в валидном состоянии).

// Зачем так делать?
// ✔️ Безопасность — нельзя создать объект с незахешированным паролем.
// ✔️ Инкапсуляция — всё управление логикой создания и валидации сосредоточено в одном месте.
// ✔️ Нельзя "сломать" объект извне.
// ✔️ Консистентность — пользователь создается всегда в корректном состоянии.
// ✔️ Немутабельность — состояние не может быть изменено после создания.

export class User {
  private constructor(
    private readonly _email: string,
    private readonly _name: string,
    private readonly _password: string // уже хеш
  ) {}

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  // Фабрика для создания объекта с хешированием пароля
  // Почему лучше использовать фабричный метод:
  // ✔️ Хеш всегда применяется.
  // ✔️ Объект гарантированно готов к использованию.
  // ✔️ Нельзя обойти правила создания (например, установить сырой пароль).
  public static async create(email: string, name: string, plainPassword: string): Promise<User> {
    const hashedPassword = await hash(plainPassword, 10);
    return new User(email, name, hashedPassword);
  }
}
```

Что запрещено с этим классом:

```TypeScript
const user = await User.create('email@mail.com', 'Alice', '123456');
user.name = 'Bob'; // ❌ Ошибка: name — readonly
user.password = 'plain'; // ❌ Ошибка: password — readonly
```

### Применение User Entity

Регистрация пользователя: Пример использования `Entity` при регистрации нового пользователя, демонстрирует создание экземпляра пользователя и установку его пароля.

`users\users.controller.ts`

```TypeScript
import { User } from './user.entity';
...

  // Пример использования User Entity при регистрации пользователя
  // Деструктурируем только { body } из Request чтобы далее не писать req.body.
  // Хорошая практика, если не используется более одного свойства из req.
  // В данном методе body является DTO объектом UserRegisterDto
  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Создание пользователя User Entity выполняется в две строки
    // 1. Применяется конструктор без пароля
    // 2. Устанавливается Хеш пароля при помощи асинхронного метода setPassword
    // Такой код лучше изменить и использовать фабричные методы создания User
    // Также создание объекта User необходимо выполнять в сервисе
    const newUser = new User(body.email, body.name);
    await newUser.setPassword(body.password);
    // В качестве тестового ответа возвращаем созданный объект пользователя
    this.ok(res, newUser);
  }
```

Тестирование

```shell
npm run dev
http POST http://localhost:8000/users/register email=test@mail.com password=testpass name=Yury
```

Результат

```Text
> npm run dev
> http POST http://localhost:8000/users/register email=test@mail.com password=testpass name=Yury

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 116
Content-Type: application/json; charset=utf-8
Date: Sat, 10 May 2025 13:13:56 GMT
ETag: W/"74-XgwpRUa7IaMSJPw60z+sKsCURic"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "_email": "test@mail.com",
    "_name": "Yury",
    "_password": "$2b$10$6ITwpnFMtEoka7oQfU7jAutMrxuo1a913jzl.8mO62nfIYwvXlNMm"
}
```

## 6.4. Сервис Users

1. Разделение роутинга и бизнес-логики в приложении.
2. Создание сервиса пользователей (`UserService`) для обработки бизнес-логики, связанной с пользователями.

### Шаги Реализации:

1. План Разделения:

   - Роутинг обрабатывается контроллером.
   - Бизнес-логика выносится в сервис пользователей (`UserService`).

2. Создание UserService:

   - Файл `users.service.ts` для кода сервиса.
   - Файл `users.service.interface.ts` для интерфейса сервиса, нужен для Dependency Injection.

3. Определение Интерфейса UserService:

   - Метод `createUser` для создания пользователя.
   - Метод `validateUser` для проверки правильности данных пользователя.

```TypeScript
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

// В Сервис приходят DTO, например UserRegisterDto или UserLoginDto
// Методы сервиса обычно возвращают Entity, null или boolean
export interface IUserService {
  // При успешном создании возвращается User Entity
  // null возвращается если такой пользователь уже есть
  createUser: (dto: UserRegisterDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
```

4. Реализация UserService:

   - Класс `UserService implenents IUserService`.
   - Реализация метода `createUser`, принимает DTO (Data Transfer Object) пользователя, возвращает пользователя или `null`.
   - Реализация метода `validateUser`, возвращает `boolean` в зависимости от проверки пользователя.

`main.ts`

```TypeScript
import { IUserController } from './users/users.controller.interface';
import { UserController } from './users/users.controller';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
...
export const appBindings = new ContainerModule(({ bind }) => {
  // Интерфейс IService... биндится на конкретную реализацию Service...
  ...
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  ...
});
```

5. Интеграция с Контроллером:

   - Инъекция сервиса (`UserService`) в контроллер для использования его методов.

`users\users.controller.ts`

```TypeScript
import { UserService } from './users.service';

@injectable()
export class UserController extends BaseController implements IUserController {
  // Декоратор @inject принимает ключ TYPES.UserService
  // для внедрения зависимости
  // Управлять зависимостями будет inversify
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: UserService
  ) {
    ...
  }
  ...
}
```

6. Бизнес-Логика:

   - Логика создания пользователя: если пользователь с таким email уже существует, возвращается `null`; иначе создается новый пользователь.
   - Принцип проверки уникальности email как бизнес-правило.

`users\users.service.ts`

```TypeScript
import 'reflect-metadata';
import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';

// Сервис может работать только с репозиторием
@injectable()
export class UserService implements IUserService {
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    // Бизнес-логика создания пользователя

    // Создание пользователя User Entity выполняется в две строки
    // 1. Применяется конструктор без пароля
    // 2. Устанавливается Хеш пароля при помощи асинхронного метода setPassword
    // Такой код лучше изменить и использовать фабричные методы создания User
    // Также создание объекта User необходимо выполнять в сервисе
    // Почему не стоит использовать setter для пароля:
    // Возможен баг: объект создан без пароля, можно забыть вызвать setPassword!
    // Нарушена консистентность: у объекта может быть "дырявое" состояние.
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    // проверка что он есть?
    // если есть - возвращаем null
    // если нет - создаём
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
```

7. Работа с API и Обработка Ошибок:

   - Контроллер обрабатывает результаты выполнения бизнес-логики и формирует соответствующий ответ API.
   - При ошибке создания пользователя (если уже существует) возвращается ошибка HTTP с кодом 422.

`users\users.controller.ts`

```TypeScript
import { UserService } from './users.service';

  ...

  // Пример использования User Service при регистрации пользователя
  // Деструктурируем только { body } из Request чтобы далее не писать req.body.
  // Хорошая практика, если не используется более одного свойства из req.
  // В данном методе body является DTO объектом UserRegisterDto
  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Контроллер отвечает за роутинг и входные/выходные данные
    // Сервис отвечает за бизнес-логику

    // Последовательность действия в методе контроллера:
    // 1. Получить входные данные
    // 2. Преобразовать входные данные
    // 3. Воспользваться сервисом для бизнес-операций
    // 4. Преобразовать результирующие данные полученные от Сервиса
    // 5. Отправить результирующие данные в ответ

    // Создание пользователя User Entity выполняется в сервисе
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует'));
    }
    // Можем выполнить дополнительные преобразование результата для отправки
    // В данном случае отправлять будем только email
    this.ok(res, { email: result.email });
  }
```

## 6.5. Middleware для роутов

Добавление возможности использовать `middleware` в пути (роутах) и управление потоком запросов через них.

- `Middleware` представляет собой функциональность, которая может быть внедрена в процесс маршрутизации для предварительной обработки запросов или ответов.
- Возможность добавления `middleware` к роутам позволяет эффективно управлять потоком запросов, реализовывать валидацию, авторизацию и другие общие задачи перед достижением конечного обработчика.
- Создание гибкого `pipeline` из `middleware` и хендлеров позволяет настроить порядок обработки запросов и ответов по требованию приложения.

До внедрения `Middleware` код контроллера `users\users.controller.ts` содержал биндинг маршрутов в виде массива данных соответствующих интерфесу `IControllerRoute`:

```TypeScript
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ]);
```

### Основные Шаги

1. Расширение структуры роута

   - Введение поля `middlewares` в интерфейс роута (`IControllerRoute`).
   - `middlewares` является массивом, элементами которого являются объекты, удовлетворяющие интерфейсу `IMiddleware`.

`common\route.interface.ts`

```TypeScript
import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middleware.interface';

// Роут контроллера
export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  // Массив необязательных обработчиков, передают управление в next
  middlewares?: IMiddleware[];
}
```

2. Создание интерфейса middleware (`IMiddleware`)

   - Определение одного метода `execute`, который принимает `request`, `response`, и `next function`, возвращая `void`.
   - Метод `execute` модифицирует запрос или ответ, а затем вызывает `next`, передавая управление следующему обработчику.

`common\middleware.interface.ts`

```TypeScript
import { NextFunction, Request, Response } from 'express';

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void;
}
```

3. Внедрение Middleware в Процесс Маршрутизации

   - Перебор middleware из роута и создание константы, сохраняющей контекст для каждого middleware (`m.execute.bind(самого себя)`).
   - Создание `pipeline` из middleware и хендлера, где порядок middleware определяется порядком в массиве. Если middleware отсутствует, используется только хендлер.

Предыдущая реализация `common\base.controller.ts` для сравнения:

```TypeScript
  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      // Логгируем все биндинги, для тестирования
      this.logger.log(`[${route.method}] ${route.path}`);
      // Чтобы не терять контекст выполнения функции
      // Сохраненяем контекст this и связываем с функцией
      // В данном случае это контекст контроллера
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
```

Обновленная реализация `common\base.controller.ts`:

```TypeScript
  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      // Логгируем все биндинги, для тестирования
      this.logger.log(`[${route.method}] ${route.path}`);
      // Чтобы не терять контекст выполнения функции
      // Сохраненяем контекст this и связываем с функцией
      // В данном случае это контекст контроллера
      const middleware = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      // При наличии middleware отработать сначала их.
      // Порядок middleware определяется порядком в массиве.
      // Если middleware отсутствует, используется только хендлер.
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
```

4. Применение Middleware

   - Пример `UserController`, где необходимо предварительно обработать метод `register` с помощью массива `middlewares`.
   - Добавление middleware для валидации данных, который либо передает управление следующему обработчику в случае успеха, либо триггирует ошибку при невалидности данных.

```TypeScript
  this.bindRoutes([
    { path: '/register', method: 'post', func: this.register, middlewares: [...] },
    { path: '/login', method: 'post', func: this.login, middlewares: [...] }
  ]);
```

## 6.6. Валидация данных

### Шаги Создания Middleware

1. Описание Middleware:

   - Разработайте `validate.middleware.ts`.
   - Этот Middleware должен имплементировать интерфейс `IMiddleware`.
   - Необходимо реализуйте метод `execute` с параметрами request и response, и возвращающий `void`.

2. Использование Валидации:

   - Валидацию реализуется через библиотеки `class-validator` и `class-transformer`.
   - `Class-validator` позволяет использовать декораторы для описания правил валидации.
   - `Class-transformer` позволит преобразовывать объекты в классы и обратно, необходимо для работы с DTO.

Установка библиотек:

```shell
npm i class-validator
npm i class-transformer
```

3. Работа с Библиотеками:

   - Из запроса приходит `body`, с которым будет происходить работа.
   - Используется класс (DTO), который будет валидироваться, с помощью конструктора в middleware.

4. Процесс Валидации:

   - Полученный объект преобразуется в класс с помощью `class-transformer`.
   - Затем, используя функцию `validate` из `class-validator`, валидируется полученный объект.
   - В случае ошибок, возвращается их массив и статус 422.
   - Если ошибок нет, вызывается функция `next` для перехода к следующему обработчику.

`common\validate.middleware.ts`

```TypeScript
import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
  // classToValidate - какой класс будем валидировать
  // Сырой body (который является объектом) преобразовать к этому классу
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    // Берем body и преобразовываем в класс того типа,
    // который изначально передавался в конструктор и замем валидируем
    const instance = plainToClass(this.classToValidate, body);
    // validate принимает instance класса и выдает ошибки при наличии
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        // Отправляем массив ошибок со статусом 422: Неверные данные
        // С помощью декораторов можно описать текстовые значения ошибок
        res.status(422).send(errors);
      } else {
        // Нет ошибок: переходим к следующему обработчику
        next();
      }
    });
  }
}
```

### Пример Применения в контроллере регистрации

1. Применить созданный middleware для валидации DTO регистрации (`UserRegisterDTO`).

```TypeScript
import { ValidateMiddleware } from '../common/validate.middleware';
  ...
    // Контроллер принимает дополнительный ValidateMiddleware
    // ValidateMiddleware вызывает валидацию от класса UserRegisterDto
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)]
      },
      { path: '/login', method: 'post', func: this.login }
    ]);
  ...
```

2. Добавить в DTO декораторы валидации (`@Email`, `@String` и другие) для необходимых полей.

`users\dto\user-register.dto.ts`

```TypeScript
import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Неверно указан email' })
  email: string;

  @IsString({ message: 'Не указан пароль' })
  password: string;

  @IsString({ message: 'Не указано имя' })
  name: string;
}
```

Также необходима валидация на Frontend, но она никогда не заменяет валидацию на Backend.

3. Теперь данные, получаемые в этом контроллере, будут автоматически валидироваться перед обработкой.

Тестирование с некорректным email

```shell
npm run dev
http POST http://localhost:8000/users/register email=testmail.com password=testpass name=Yury
```

Результат: Ошибка со статусом 422 Unprocessable Entity
Ошибка генерируется при помощи `class-validator`. Эту ошибку можно сгенерировать также в другом формате.

```Text
> npm run dev
> http POST http://localhost:8000/users/register email=testmail.com password=testpass name=Yury

HTTP/1.1 422 Unprocessable Entity
Connection: keep-alive
Content-Length: 191
Content-Type: application/json; charset=utf-8
Date: Sat, 10 May 2025 21:23:38 GMT
ETag: W/"bf-sdnA5LktUwjyqAin7C2TPj9ciYU"
Keep-Alive: timeout=5
X-Powered-By: Express

[
    {
        "children": [],
        "constraints": {
            "isEmail": "Неверно указан email"
        },
        "property": "email",
        "target": {
            "email": "testmail.com",
            "name": "Yury",
            "password": "testpass"
        },
        "value": "testmail.com"
    }
]
```

## 7.1. Сервис конфигурации

- Использование файлов `.env` для управления переменными окружения.
- Создание конфиг-сервиса для работы с этими переменными.
- Использование библиотеки `dotenv`.
- Реализация паттерна `singleton` в сервисах приложения.

### Шаги

1. Подключение библиотеки `dotenv`

https://www.npmjs.com/package/dotenv

```shell
npm i dotenv
```

2. Создание конфиг-сервиса

   - Создание папки `config` и файлов для сервиса и его интерфейса.
   - Определение интерфейса `IConfigService` с методом `get`, которые позволяет получить значение по ключу.
   - Реализация чтения `.env` файла и парсинга его содержимого.
   - Добавление метода `get` для получения значений переменных окружения.

`config\config.service.interface.ts`

```TypeScript
export interface IConfigService {
  get: (key: string) => string;
}
```

`config\config.service.ts`

```TypeScript
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    // Результат парсинга файла .env будет в result
    const result: DotenvConfigOutput = config(); // Получение конфигурации
    if (result.error) {
      this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
    } else {
      this.logger.log('[ConfigService] Конфигурация .env загружена');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
```

3. Singleton и Inversify
   - Описание работы синглтонов и их реализации в `Inversify`.
   - Настройка биндингов с использованием `singletonScope` для избежания создания множественных экземпляров сервиса.
   - Пример использования конфиг-сервиса для чтения значения переменной окружения.

`src\types.ts`

```TypeScript
export const TYPES = {
  ...
  ConfigService: Symbol.for('ConfigService')
};
```

`main.ts`

```TypeScript
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
...

export const appBindings = new ContainerModule(({ bind }) => {
  ...
  // Singleton - будет создан единственный экземпляр и будет передаваться в @inject-ах
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
});
```

Использование ConfigService в `app.ts`

```TypeScript
import { IConfigService } from './config/config.service.interface';

@injectable()
export class App {
  app: Express; // Интерфейс приложения Express
  server: Server; // Используется стандартный 'node:http'
  port: number; // Порт может быть конфигурируемым

  // Реализация конструктора для будущих зависимостей
  constructor(
    ...
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    ...
  }
}
```

Использование ConfigService в `users\users.service.ts`

```TypeScript
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
...
@injectable()
export class UserService implements IUserService {
  // Подключение конфигурационного .env
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    ...
    const newUser = new User(email, name);
    // Используем соль из конфигурации .env
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    ...
  }
}
```

### Пример файла .env

Обычно .env исключают из git-репозитория т.к. в нем находится инфрация о паролях, ключах и др.

```Text
SALT=10
```

## 7.2. Работа с Prisma

https://www.prisma.io/

1. Введение в ORM и выбор Prisma:
   `ORM` (Object Relational Mapping) облегчает работу с базами данных за счет преобразования данных в объекты.
   `Prisma` обеспечивает `Type Safety` (типобезопасность) для моделей.
   Простота в выполнении запросов.
   Активное развитие и поддержка от сообщества.

2. Отличия ORM и альтернативы Prisma:
   `TypeORM` и `Sequalize` являются альтернативами для работы с реляционными БД.
   `TypeORM` - развивается слабо, уже много лет не выпускалась новая версия.
   `Mongoose` используется для работы с MongoDB.
   Основное преимущество `Prisma` - поддержка `Type Safety` и лёгкость в выполнении запросов отношений между таблицами.

3. Установка `Prisma` и настройка проекта:
   Установка `Prisma CLI` и `Prisma Client` через npm.

Dev установка необходима для выполнения инициализации, генерации схем и др.

```shell
npm i -D prisma
```

Установка клиента Prisma в Runtime. С помощью клиента будем устанавливать соединение и описывать типы.

```shell
npm i @prisma/client
```

Инициализация `Prisma` с созданием файла конфигурации и указанием SQLite в качестве базы данных.

npx - предназначен для выполнение указанного пакета. Команда `npx prisma init` создает пустую конфигурацию Prisma.

```shell
npx prisma init
```

Вывод в консоль:

```Text
>npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has
no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```

Будет сгенерирована папка `prisma` с файлом схемы `prisma\schema.prisma`.
Это описание схемы БД в синтаксисе Prisma:

```JS
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Желательно установить Prisma плагин для VSCode для подсветки синтаксиса.

```Text
Identifier
prisma.prisma
Version
6.7.1
Published
2019-06-12, 13:14:01
Last Released
2025-05-09, 13:41:53
```

4. Создание модели пользователя в `Prisma`:
   Описание модели с помощью `Prisma Schema` с указанием полей `id`, `email`, `password` и имени пользователя.
   Произведение первичной миграции для создания таблицы пользователя.

Изменения в файле конфигурации.

```JS
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model UserModel {
    id       Int    @id @default(autoincrement())
    email    String
    password String
    name     String
}
```

Генерация типов Prisma.

```shell
npx prisma generate
```

Данная команда выполняется часто, поэтому можно включить ее в конфигурацию. Нужно будет перегенерировать контракты TypeScript когда мы меняем модель и в других ситуациях.

`package.json`

```JSON
  "scripts": {
    ...
    "generate": "prisma generate",
    ...
  },
```

Выполнение генерации

```shell
npm run generate
```

```Text
> npm run generate

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (v6.7.0) to .\src\generated\prisma in 57ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

Tip: Want to react to database changes in your app as they happen? Discover how with Pulse: https://pris.ly/tip-1-pulse
```

5. Выполнение первичной миграции.

При выполнении первичной миграции будет запрощено описание первичной миграции, можно для примера указать `init`

```shell
npx prisma migrate dev
```

```Text
> npx prisma migrate dev

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db

√ Enter a name for the new migration: ... init
Applying migration `20250511120323_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20250511120323_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v6.7.0) to .\src\generated\prisma in 94ms
```

Изменение `.gitignore`:

```Text
/prisma/dev.db
/prisma/dev.db-journal
```

6. Создание Prisma Service для работы с базой данных:
   Создание сервиса для подключения к базе данных и взаимодействия с ней через `Prisma Client`.
   Типизация объектов на основе модели пользователя для работы с данными.

`database\prisma.service.ts`

```TypeScript
import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

// UserModel - это модель, сгенерированная Prisma в generated/prisma
// UserModel не имеет каких-либо методов, это чистая модель для данных

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  // Подключение к БД
  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] Успешно подключились к базе данных');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error('[PrismaService] Ошибка подключения к базе данных: ' + e.message);
      }
    }
  }

  // Отключение от БД
  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
```

`types.ts`

```TypeScript
export const TYPES = {
  ...
  PrismaService: Symbol.for('PrismaService')
};
```

`main.ts`

```TypeScript
import { PrismaService } from './database/prisma.service';
...
export const appBindings = new ContainerModule(({ bind }) => {
  ...
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  ...
});
```

`app.ts`

```TypeScript
import { PrismaService } from './database/prisma.service';
...
@injectable()
export class App {
  ...
  // Реализация конструктора для будущих зависимостей
  constructor(
    ...
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {
    ...
  }

  // Инициализация приложения при запуске
  public async init(): Promise<void> {
    ...
    // Подключение БД
    await this.prismaService.connect();
    ...
  }
}
```

7. Недостатки Prisma:
   Недостатки: свой синтаксис схем и необходимость ручной генерации кода для типов.

Проверка подключения к БД

```
> npm run dev

> bin-api@1.0.0 dev
> nodemon

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src\**\*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/main.ts`
2025-05-11 14:16:10 INFO: [ConfigService] Конфигурация .env загружена
2025-05-11 14:16:10 INFO: [post] /register
2025-05-11 14:16:10 INFO: [post] /login
2025-05-11 14:16:11 INFO: [PrismaService] Успешно подключились к базе данных
2025-05-11 14:16:11 INFO: Сервер запущен на http://localhost:8000
```

## 7.3. Репозиторий users

Репозиторий для взаимодействия с базой данных через отдельные сущности.

Что такое Репозиторий?

1. Репозиторий – это сервис с ограниченным API для взаимодействия с базой данных, предназначенный для определенной сущности (`entity`), например, пользователи или автомобили.
2. Функции: Позволяет создавать, искать и взаимодействовать с данными сущности, изолируя сложности работы с базой данных.

### Структура Репозитория

`Организация По Сущностям`: Для каждой сущности (например, пользователи) создается своя директория с репозиторием и другими необходимыми классами (контроллеры, сервисы, энтити).

### Реализация Репозитория

1. Создается интерфейс (например, `users.repository.interface.ts`) для определения доступных методов.
2. Реализуется класс репозитория (например, `users.repository.ts`) на основе интерфейсного контракта.

### Основные Методы Репозитория

1. `Create`: Создает новую запись в базе данных.
2. `Find`: Поиск записи по заданному критерию (например, по e-mail).

### Интеграция с Prisma

1. `Prisma Service`: Используется для работы с базой данных, репозиторий через DI (Dependency Injection) получает доступ к Prisma Service.

2. `Методы Prisma`: Репозиторий использует функции Prisma для создания или поиска записей в соответствии с его методами (Create, Find), обеспечивая абстракцию над деталями реализации запросов к базе данных.

Пример кода: `users\users.repository.interface.ts`:

```TypeScript
import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
  // Создание пользователя
  // Входной параметр - User Entity, Результат - модель Prisma из БД
  create: (user: User) => Promise<UserModel>;

  // Поиск пользователя по email (уникальное значение)
  // Результат - модель Prisma из БД или null если ничего не найдено
  // Лучше использовать null, а не генерировать ошибки
  // Проверку на null проще выполнить, получаем простой линейный код
  find: (email: string) => Promise<UserModel | null>;
}
```

Пример кода `users\users.repository.ts`:

```TypeScript
import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

// С точки зрения разделения ответственности UsersRepository должен работать
// только с моделью UserModel.

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  // Пример создания метода create в репозитории users.repository.ts
  // Входные параметры можно деструктурировать для удобства
  async create({ email, password, name }: User): Promise<UserModel> {
    // prismaService.client. содержит методы для сгенерированных моделей
    // userModel - доступна после генерации из Prisma нотации prisma\schema.prisma
    // userModel содержит набор методов для создания/удаления/поиска... user
    return this.prismaService.client.userModel.create({
      data: {
        email,
        password,
        name
      }
    });
  }

  // Пример реализации метода find с проверкой на уникальность e-mail
  async find(email: string): Promise<UserModel | null> {
    // prismaService.client. содержит методы для сгенерированных моделей
    // userModel - доступна после генерации из Prisma нотации prisma\schema.prisma
    // userModel содержит набор методов для создания/удаления/поиска... user
    return this.prismaService.client.userModel.findFirst({
      where: {
        email
      }
    });
  }
}
```

`types.ts`

```TypeScript
export const TYPES = {
  ...
  PrismaService: Symbol.for('PrismaService'),
  UsersRepository: Symbol.for('UsersRepository')
};
```

`main.ts`

```TypeScript
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';
...
export const appBindings = new ContainerModule(({ bind }) => {
  ...
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
  ...
});
```

Пример изменений `users\users.service.interface.ts`,
createUser возвращает модель `UserModel`:

```TypeScript
import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

// В Сервис приходят DTO, например UserRegisterDto или UserLoginDto
// Методы сервиса обычно возвращают Entity, null или boolean
export interface IUserService {
  // При успешном создании возвращается User Model
  // null возвращается если такой пользователь уже есть
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
```

`users\users.service.ts`

```TypeScript
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

// Сервис может работать только с репозиторием
@injectable()
export class UserService implements IUserService {
  // Подключение конфигурационного .env
  // Подключение репозитория
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    // Бизнес-логика создания пользователя

    // Создание пользователя User Entity выполняется в две строки
    // 1. Применяется конструктор без пароля
    // 2. Устанавливается Хеш пароля при помощи асинхронного метода setPassword
    // Такой код лучше изменить и использовать фабричные методы создания User
    // Также создание объекта User необходимо выполнять в сервисе
    // Почему не стоит использовать setter для пароля:
    // Возможен баг: объект создан без пароля, можно забыть вызвать setPassword!
    // Нарушена консистентность: у объекта может быть "дырявое" состояние.
    const newUser = new User(email, name);
    // Используем соль из конфигурации .env
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));

    // проверка что он есть?
    // если есть - возвращаем null
    // если нет - создаём
    const existedUser = await this.usersRepository.find(email);
    if (existedUser) {
      return null; // пользователь уже есть в БД
    }
    // Создание пользователя в БД с хешированным паролем
    return this.usersRepository.create(newUser);
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
```

Тестирование `UsersRepository`

```
> npm run dev

> bin-api@1.0.0 dev
> nodemon

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src\**\*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/main.ts`
2025-05-11 16:06:36 INFO: [ConfigService] Конфигурация .env загружена
2025-05-11 16:06:36 INFO: [post] /register
2025-05-11 16:06:36 INFO: [post] /login
2025-05-11 16:06:36 INFO: [PrismaService] Успешно подключились к базе данных
2025-05-11 16:06:36 INFO: Сервер запущен на http://localhost:8000

-----------------------------------------------------------------

> http POST http://localhost:8000/users/register email=test@mail.com password=testpass name=Yury

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 32
Content-Type: application/json; charset=utf-8
Date: Sun, 11 May 2025 16:07:18 GMT
ETag: W/"20-AxzlE0B8bFv4mpO2/teO4otUN/Q"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "email": "test@mail.com",
    "id": 1
}
```

## 7.4. Простая проверка авторизации - Логин пользователя

Реализация проверки авторизации пользователя по логину и паролю без создания JWT-токена.

### Шаги выполнения:

1. Валидация входных данных:

   - В `UserService`, добавляется метод `validateUser`, который будет проверять пользователя на существование в базе и валидировать его данные.
   - Использовать DTO для логина для проверки корректности данных (добавить необходимые декораторы).
   - Добавить `middleware` для валидации данных, переданных на `endpoint` логина.

В `users\dto\user-login.dto.ts` необходимо добавить декораторы для валидации.

```TypeScript
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Неверно указан email' })
  email: string;

  @IsString()
  password: string;
}
```

Добавление метода сравнения паролей в `users\user.entity.ts` и модификация конструктора.

```TypeScript
import { compare, hash } from 'bcryptjs'; // Используем асинхронную функцию hash

// Иногда в именовании классов применяют слово Entity, например UserEntity
export class User {
  // Добавлена возможность конструировать пользователя с опциональным Хешем
  constructor(
    private readonly _email: string,
    private readonly _name: string,
    passwordHash?: string // Опциональный Хеш
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  // Пароль хранится как хеш, недопустимо хранить пароль в открытом виде
  ...
  public async comparePassword(pass: string): Promise<boolean> {
    return compare(pass, this._password);
  }
}
```

2. Реализация метода логина:

   - Создать второй метод логина в контроллере.
   - Метод принимает логин и пароль, ищет пользователя в БД. Если пользователь найден, производится сравнение хэшей паролей.
   - Если данные корректны, возвращает пустой объект (в будущем здесь будет генерироваться JWT-токен), иначе возвращает ошибку авторизации (401).

3. Работа с паролями:

   - В реализации использовать функцию сравнения хэшей паролей (например, через `bcrypt.compare`) без сохранения исходного пароля в открытом виде.
   - Расширить класс пользователя добавлением хэша пароля для упрощения сравнения.

В `users\users.service.ts` найти пользователя по email:

```TypeScript
  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    // Поиск пользователя в БД
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) {
      return false; // Нет такого пользователя
    }
    // Конструируем пользователя
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    // Проверяем совпадение пароля - это результат валидации пароля
    return newUser.comparePassword(password);
  }
```

4. Дополнительные моменты:

   - Обратить внимание на использование правильных DTO для логина и регистрации.
   - Проверить корректность возвращаемых ошибок и результатов действий.
   - Рассмотреть возможность оптимизации через введение `Mapper` для преобразования моделей в сущности. Это функция, которая упрощает создание Entity из Model-ей чтобы не усложнять конструкторы Entity.

Внесение изменений в метод login `users\users.controller.ts` и добавление `middlewares` для валидации:

```TypeScript
...
@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: UserService
  ) {
    ...
    this.bindRoutes([
      ...
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)]
      }
    ]);
  }
  ...

  // Третий параметр в Request<{}, {}, UserLoginDto> является ReqBody
  // ReqBody - это данные которые будут приходить методом POST UserLoginDto
  // в качестве body будем использовать DTO объект
  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Для JSON используется body-parser, он парсит UserLoginDto в req.body
    console.log(req.body); // body будет UserLoginDto
    // req.body является UserLoginDto и его можно использоват далее как объект

    console.log('. Точка отладки .');

    // Валидация пользователя по паролю
    const result = await this.userService.validateUser(req.body);
    // Если валидация по паролю не пройдена
    if (!result) {
      return next(new HTTPError(401, 'ошибка авторизации', 'login'));
    }
    // Если валидация по паролю успешна, возвращаем пустой body
    this.ok(res, {});
  }
...
}
```

### Пример выполнения:

1. При успешном логине возвращается пустой объект (статус `200`).
2. При неправильно введенном пароле возвращается ошибка авторизации (`401`).

```shell
npm run dev
http POST http://localhost:8000/users/login email=test@mail.com password=testpass
http POST http://localhost:8000/users/login email=peter@gmail.com password=testpass
```

Положительный ответ (пароль корректный)

```
> http POST http://localhost:8000/users/login email=test@mail.com password=testpass

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: application/json; charset=utf-8
Date: Sun, 11 May 2025 17:55:32 GMT
ETag: W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Keep-Alive: timeout=5
X-Powered-By: Express

{}
```

Отрицательный ответ (пароль не совпадает)

```
> http POST http://localhost:8000/users/login email=peter@mail.com password=testpass

HTTP/1.1 401 Unauthorized
Connection: keep-alive
Content-Length: 45
Content-Type: application/json; charset=utf-8
Date: Sun, 11 May 2025 17:56:43 GMT
ETag: W/"2d-ZsKL4B5+lRZUzS8eVsZuDMLJFgI"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "err": "ошибка авторизации"
}
```

## 8.1. Работа JWT

JWT (JSON Web Token) - это строка, которая позволяет безопасно передавать между сторонами информацию. Он используется для авторизации и информационного обмена.

Предшественники JWT: Раньше для авторизации использовались Cookie, однако возникли проблемы с их применимостью при взаимодействии разных доменов и в микросервисных архитектурах. JWT стал решением этих проблем, предоставляя способ подтвердить авторизацию без привязки к домену.

JWT - это строка, описание структуры и проверка:
https://jwt.io/

### Как работает JWT?

1. Авторизация пользователя:
   Пользователь отправляет свои данные сервису логина, который в ответ выдает JWT.

2. Использование токена:
   Для доступа к приватным роутам пользователь отправляет запросы с JWT в заголовке Authorization. В этом заголовке указан token, который подтверждает его авторизацию.

3. Проверка токена на сервере:
   Сервер принимает JWT, расшифровывает его и проверяет подпись (токен подписан неким секретом), чтобы убедиться в его подлинности и валидности.

### Структура JWT

JWT состоит из трех частей, разделенных точками:

1. Заголовок (Header):
   Содержит информацию о типе токена (JWT) и используемом алгоритме шифрования (например, HS256).

2. Полезная нагрузка (Payload):
   Содержит выдаваемые данные, такие как email или ID пользователя.

3. Подпись (Signature):
   Используется для верификации, что отправитель JWT является тем, за кого себя выдает.

Пример JSON Web Token (JWT) Encoded value:

```jwt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
```

Decoded Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Decoded Payload

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```

Secret / Encoding Format UTF-8

```
a-string-secret-at-least-256-bits-long
```

### Процесс верификации

1. Для создания подписи используется секретный ключ с выбранным алгоритмом (например, HMAC-SHA256).

2. Сервер, получающий JWT, использует тот же секретный ключ для проверки подписи. Это гарантирует, что JWT не был подделан.

### Применение JWT

1. JWT широко используется для авторизации в микросервисных системах и других случаях, когда необходим безопасный обмен информацией между различными системами.

2. JWT стал стандартом для авторизации и безопасного обмена информацией между сервисами.

### Практика

Применение JWT заключается в создании и верификации токенов с использованием специализированных библиотек. Освоение этого процесса критически важно для разработчиков, работающих с авторизацией и безопасностью веб-приложений.

## 8.2. Создание токена

Авторизация пользователя с помощью JWT (JSON Web Tokens).
Процесс создания токена при успешном логине и его дальнейшее использование.

### Используемые инструменты

1. Библиотека JSONWebToken:
   Выбрана для создания и управления JWT из-за своей популярности и легкости интеграции.

2. Официальный сайт JWT.io:
   Содержит много библиотек для работы с JWT на различных языках программирования.

Популярные библиотеки
npm install jsonwebtoken
npm install jose
npm install jsrsasign

### Подготовка

Будем использовать `JSONWebToken`
Установка JSONWebToken:

```shell
npm i jsonwebtoken
```

Установка типов для TypeScript: Если используете TypeScript, необходимо также добавить типы:
Типы можно устанавливать как Dev-зависимости:

```shell
npm i -D @types/jsonwebtoken
```

### Создание Токена

1. Функция `sign` из JSONWebToken: Используется для подписывания токенов. Может использоваться как в синхронном, так и в асинхронном варианте. В нашем случае, предпочтение отдаётся асинхронному варианту.

2. Данные для токена: Обычно включают email пользователя и время выпуска токена.

`users\users.controller.ts`

```TypeScript
import { sign } from 'jsonwebtoken';

@injectable()
export class UserController extends BaseController implements IUserController {
  // Декоратор @inject принимает ключ TYPES.ILogger для внедрения зависимости
  // Управлять зависимостями будет inversify
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    super(loggerService);
    // ...
  }

  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Валидация пользователя по паролю
    const result = await this.userService.validateUser(req.body);
    // Если валидация по паролю не пройдена
    if (!result) {
      return next(new HTTPError(401, 'ошибка авторизации', 'login'));
    }

    // Если валидация по паролю успешна, возвращаем JWT
    // JWT подписывается секретным ключом, который читаем из .env
    const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
    this.ok(res, { jwt });
  }

  // SECRET будем хранить в .env файле
  private signJWT(email: string, secret: string): Promise<string> {
    // Оборачиваем callback-функцию sign в Promise
    return new Promise<string>((resolve, reject) => {
      // Параметры функции sign
      // 1. Payload: email + Issued at (когда выпущен)
      //    Рекомендуется всегда добавлять время выпуска,
      //    иначе всегда будет одинаковый токен независимо от времени выпуска.
      //    Нормальная практика использовать два токена JWT и Refresh.
      //    JWT токен имеет ограниченное время жизни, затем его обновляют
      //    Для обновления JWT отправляется Refresh токен и
      //    в ответ получаем Новый JWT + Новый Refresh
      //    Такая цепочка гарантирует стойкость при компроментации JWT.
      //    При утере токена злоумышленник сможет воспользоваться им только
      //    определенный период времени, до момента обновления.
      // 2. Secret
      // 3. Дополнительные опции: алгоритм и др.
      // 4. Функция-callback выполнится при ошибке или успешном формировании JWT
      //    (err, token) => { ... }
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000)
        },
        secret,
        {
          algorithm: 'HS256'
        },
        (err, token) => {
          if (err) {
            reject(err); // ошибка
          }
          // token может быть undefined если возникла ошибка.
          // Если ошибки нет, токен всегда будет string
          // Т.к. token может быть string | undefined, используем явное приведение типа
          // Приведение типа необходимо т.к. функция signJWT возвращает Promise<string>
          resolve(token as string);
        }
      );
    });
  }
}
```

3. Секрет для подписи: Необходимо хранить в безопасности и использовать для шифрования токена. Следует добавить его в `.env` файл проекта.

```Text
SALT=10
SECRET='SUPERSECRET'
```

### Примечания по реализации

1. Refresh Tokens: Работа с ограниченным по времени JWT и механизмом обновления сессии с использованием Refresh Tokens не используется в данной реализации.

2. Обработка ошибок и безопасность: Важно правильно обрабатывать возможные ошибки и обеспечить безопасность данных пользователей.

### Пример реализации

1. Создание приватного метода для асинхронной подписи JWT.
2. Использование полученного email пользователя для создания Payload токена.
3. Добавление времени создания токена для обеспечения уникальности.
4. Установка алгоритма шифрования (HS256) для подписи.

### Проверка

Использование сайта JWT.io для проверки корректности созданного токена и его подписи.

```shell
npm run dev
http POST http://localhost:8000/users/login email=test@mail.com password=testpass
http POST http://localhost:8000/users/login email=peter@gmail.com password=testpass
```

При положительном ответе (пароль корректный) получаем JWT

```
>http POST http://localhost:8000/users/login email=test@mail.com password=testpass
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 147
Content-Type: application/json; charset=utf-8
Date: Tue, 13 May 2025 09:48:41 GMT
ETag: W/"93-1/FZabu+DiHHXylXxCnUki1VBcU"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3NDcxMjk3MjF9.WmwAl0qtthW6gcsf4iYnQViHFsFgEvu6jOHmymIYJKE"
}
```

## 8.3. Middleware для проверки jwt

Создание, верификация JWT токенов и использование их для ограничения доступа к роутам в Express-приложении.
Собственная системы авторизации без использования готовых библиотек (например, `Passport.js` для Express).

Библиотека `JSONWebToken` может использоваться для `подписи токенов` и для `верификации токенов`.

1. Создание Middleware для Авторизации:

   - Создание файла `auth.middleware.ts`.
   - Middleware должен реализовывать интерфейс `IMiddleware` с функцией `execute`.

`common\auth.middleware.ts`

```TypeScript
import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
  // secret - строка, которой шифруется и дешифруется JWT
  constructor(private secret: string) {}

  // Авторизационный Middleware будет включен на глобальном уровне
  // Работает для всех запросов
  // Но если в заголовке нет данных авторизации, выполнение переходит далее next()
  execute(req: Request, res: Response, next: NextFunction): void {
    // Данные авторизации в находятся в заголовке который состоиз из 2-х частей
    // Bearer JWT...
    if (req.headers.authorization) {
      // Убираем слово Bearer и оставляем только строку JWT
      // Затем проверяем методом verify из библиотеки jsonwebtoken
      // используем секретный ключ для дешифрования payload
      // this.secret будет предварительно задан через конструктор
      // Третий параметр (err, payload) ... - стрелочная функция при завершении
      verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
        if (err) {
          next(); // Ничего не делаем
        } else if (payload && typeof payload === 'object' && 'email' in payload) {
          // В типе Request из Express нет пользователя, его нужно добавить
          // Необходимо использовать типы d.ts которые позволяют дополнить типы,
          // либо определить свои типы, либо типизировать библиотеку если
          // если библиотека не типизирована
          // Дополняем namespace Express в файле types/custom.d.ts
          req.user = payload.email; // Добавим в Request пользователя
          next();
        }
      });
    }
    next();
  }
}
```

2. Верификация JWT Токена:

   - Извлечение токена из заголовка `Authorization`.
   - Разделение заголовка на `bearer` и сам токен.
   - Использование метода `verify` библиотеки `JSONWebToken` для верификации токена.
   - Обработка ошибок и успешной верификации.
   - Обогащение объекта запроса ('request') данными пользователя из токена.

При генерации токена можно все токены, сгенерированные именно нашим сервисом сохранять в БД.
Теоретически при каждом запросе можно обращаться в БД для проверки токена, что именно мы его выдали. Но это дополнительная большая нагрузка и увеличение времени отклика, поэтому верифицируем только токен. Мы доверяем токену и делаем предположение, что только мы можем выпустить (сгенерировать) токен т.к. секретный ключ есть только у нас.

3. Типизация Расширенных Данных Запроса:

   - Добавление кастомного типа для объекта запроса (`Request`) через файл `custom.d.ts`.
   - Декларирование пользователя в пространстве имён `Express`.

Дополняем `namespace Express` в файле `types/custom.d.ts` в этом файле будем записывать дополнительные интерфейсы и типы для того, чтобы дотипизировать наш код. Поскольку у интерфейсов в TypeScript есть возможность мержиться (объединяться между собой), используем эту особенность для дополнения интерфейса Request библиотеки Express дополнительным полем `user: string`. В библиотеке этот интерфейс определен в пространстве имен `namespace Express`, поэтому дополнение интерфейса Request выполняем в том же пространстве имен. Декларируем такое же пространство имен и такой же интерфейс как в библиотеке Express:

```TypeScript
declare namespace Express {
  export interface Request {
    user: string;
  }
}
```

4. Применение Middleware:

   - Внедрение `auth.middleware` на глобальном уровне в приложение.
   - Передача секрета для верификации токена из конфигурации.

`app.ts`

```TypeScript
...
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
  ...
  // Глобальный парсер BODY в JSON для всех запросов
  // Также можно настроить Middleware для конкретных запросов
  useMiddleware(): void {
    // Приложение (this.app) использует (this.app.use) Middleware
    this.app.use(json()); // Парсер BODY в JSON для всех запросов

    // Внедрение auth.middleware на глобальном уровне в приложение
    const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
    // Теперь во всех запросах Request будет доступно поле user
    // если запрос был выполнен с токеном, иначе поле user будет undefined
  }
  ...
}
```

5. Тестирование Системы Авторизации:

   - Создание тестового метода для вывода информации о пользователе.
   - Тестирование с использованием JWT токена в запросе.

Дополняем интерфейс методом для получения информации о пользователе

`users\users.controller.interface.ts`

```TypeScript
import { NextFunction, Request, Response } from 'express';

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  // Дополняем интерфейс методом для получения информации о пользователе
  info: (req: Request, res: Response, next: NextFunction) => void;
}
```

`users\users.controller.ts`

```TypeScript
  ...
// Декоратор @injectable говорит, что UserController можно положить в конейнер
@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    ...
    this.bindRoutes([
      ...
      {
        path: '/info',
        method: 'get',
        func: this.info,
        middlewares: []
      }
    ]);
  }

  async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    // Если выполнен запрос с валидным токеном, Request будет содержать информацию user
    // В случае валидного токена авторизации получим в ответе email: user
    this.ok(res, { email: user });
  }
  ...
}
```

6. Дополнительные Настройки:

   - Настройка `ts-node` и `nodemon` для работы с кастомными типами.

Чтобы подтягивались дополнительные типы необходима модификация настроек, добавляем опцию `--files` в конфигурационном файле `nodemon.json`.

`--files` позволяет добавить дополнительные типы в определения.

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node --files ./src/main.ts"
}
```

### Выполнение сборки для корректного добавления custom types и тестирование

```shell
npm run build
npm run dev
http GET http://localhost:8000/users/info Authorization:"Bearer JWTabcdXXAAffss12345"
```

```Text
> http GET http://localhost:8000/users/info Authorization:"Bearer eyJhbGciOiJ123I1NiIsInXXXCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb2333CJpYXXXOjE3NDcxMjk3MjF9.WmwAl0qtthW6gcsf4iYnQViHXXXgEvu6jOH123IYJKE"

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 25
Content-Type: application/json; charset=utf-8
Date: Wed, 14 May 2025 14:25:32 GMT
ETag: W/"19-SjKRhlyL1siEkj1UiWox5TCOGts"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "email": "test@mail.com"
}
```

### Пример с curl

```shell
curl -X GET http://localhost:8000/users/info -H "Authorization: Bearer eyJhbGciIkpXVCJ9..."
```

Чтобы дополнить запрос токеном в заголовке с помощью httpie, нужно использовать заголовок Authorization в формате:

```makefile
Authorization: Bearer <токен>
```

### Пример команды:

```bash
http GET http://localhost:8000/users/info Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

- `http` — команда httpie;
- `GET` — HTTP-метод;
- `http://localhost:8000/users/info` — URL запроса;
- `Authorization:"Bearer <токен>"` — передаётся заголовок.

Обязательные условия для обработки запросов с токеном авторизации:

- токен валиден и не истёк.
- сервер действительно ожидает заголовок Authorization в формате Bearer.

Если токен в переменной окружения, можно передать его так:

```bash
http GET http://localhost:8000/users/info Authorization:"Bearer $TOKEN"
```

Слово `Bearer` в контексте заголовков авторизации означает буквально «носитель» или «обладатель». Оно указывает, что обладатель токена (`bearer token`) имеет право на доступ, без дополнительной проверки личности.

Перевод Bearer: Носитель, владелец

### История и происхождение

Формат `Authorization: Bearer <token>` появился с `OAuth 2.0`, который был стандартизирован в `RFC 6750 (2012)` как часть `OAuth 2.0 Bearer Token Usage`.

### Почему Bearer?

В протоколе `OAuth 2.0` токен выдаётся клиенту (например, браузеру).

Кто носит (`bear`) этот токен — тот и считается авторизованным.

Никаких дополнительных проверок не проводится (например, подписи или сертификаты) — достаточно только предъявить токен.

Это похоже на предъявление пропуска: если у тебя есть токен — ты проходишь, независимо от того, кто ты на самом деле.

### Пример в HTTP-заголовке

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### Безопасность

Поскольку Bearer токен не требует подтверждения владения (в отличие, например, от HMAC), он должен передаваться только по HTTPS. Любой, кто его перехватит, сможет им воспользоваться.

### Примечания к использованию `verify` библиотеки `jsonwebtoken`:

в современных версиях библиотеки `jsonwebtoken` (начиная примерно с версии `v8+` и выше, особенно в версиях с полной поддержкой TypeScript), у функции `verify` третий параметр — колбэк, который принимает два аргумента:

```TypeScript
(err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => void
```

То есть:

- `err`: ошибка верификации или null, если всё прошло успешно;
- `decoded`: расшифрованный `payload`, который может быть:
- строкой (`string`) — если токен был закодирован строкой;
- объектом (`JwtPayload`) — если токен содержит объект;
- `undefined` — если по какой-то причине decoded не получен.

Исторически в старых версиях `jsonwebtoken` до официальной поддержки TypeScript (до v8.x), типы не шли в составе библиотеки. Требовалась установка `@types/jsonwebtoken`, и типизация могла отличаться или быть менее строгой.

До версии 9.0.0 сигнатура выглядела так же, но в типах была некоторая неоднозначность, например `decoded: any`.

В последних версиях (особенно после `jsonwebtoken@9.x`), типы уточнены, и теперь `decoded` — это строго `string | JwtPayload | undefined`.

Пример текущей сигнатуры из `@types/jsonwebtoken`:

```TypeScript
verify(
  token: string,
  secretOrPublicKey: Secret,
  options: VerifyOptions,
  callback: (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => void
): void;
```

### Вывод

Если используются современные версии `jsonwebtoken` с актуальными типами (либо встроенными, либо из `@types/jsonwebtoken`), то:

- `payload` (или decoded) — всегда `string | JwtPayload | undefined`;
- нужно делать проверку типа перед обращением к полям (email, id, и т.п.).

## 8.4. Guard авторизации

1. Реализация `guard` для ограничения доступа неавторизованных пользователей.
   Также в JWT можно добавить роли и использовать их для авторизации.
2. Исправление ошибок в существующем `middleware`.
3. Реализация функции для получения информации о пользователе.

Шаги реализации:

1. Исправление ошибки в `Middleware`:

   - Проблема: Асинхронная функция `verify` вызывается всегда, даже если проверка пройдена, из-за отсутствия `else` после `if`
   - Решение: Добавить `else` для предотвращения двойного вызова `next()`

Необходимо добавить в `common\auth.middleware.ts` else в блоке с методом `execute` поскольку оператор if используется с функцией `verify` с асинхронным callback, в результате чего может еще не сработать callback но выполнится `next()`. Это могло приводить к двойному срабатыванию `next()`.

Исправленный вариант:

```TypeScript
export class AuthMiddleware implements IMiddleware {
  ...
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      verify(req.headers.authorization.split(' ')[1], this.secret,
      (err, payload) => {
        if (err) {
          next(); // Ничего не делаем, возможен повторный вызов
        } else if (payload && typeof payload === 'object' && 'email' in payload) {
          req.user = payload.email; // Добавим в Request пользователя
          next(); // Возможен повторный вызов
        }
      });
    } else { // Нужно добавить этот блок else
      next();
    }
  }
}
```

2. Создание `Guard`:

   - Guard будет использоваться для проверки авторизации пользователя перед доступом к контроллерам
   - Создание файла `auth.guard.ts`
   - Реализация проверки наличия `request.user`, если нет - возврат ошибки с кодом 401

Создаем новый `Middleware` класс, с названием `AuthGuard`. Название класса выбрано по аналогии с другими фреймворками, например в NestJS также используется Guard, по сути это `ограничитель` который блокирует дальнейшее исполнение:

`common\auth.guard.ts`

```TypeScript
import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class AuthGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    // Нужно проверить наличие в Request user
    if (req.user) {
      return next(); // все хорошо, мы пропускаем дальше
    }
    res.status(401).send({ error: 'Вы не авторизованы' });
  }
}
```

3. Добавление `Guard` к контроллеру:
   В контроллере добавить созданный `guard` в соответствующий `route` для ограничения доступа

```TypeScript
import { AuthGuard } from '../common/auth.guard';
...
@injectable()
export class UserController extends BaseController implements IUserController {
  // Декоратор @inject принимает ключ TYPES.ILogger для внедрения зависимости
  // Управлять зависимостями будет inversify
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    ...
    this.bindRoutes([
      {
        path: '/info',
        method: 'get',
        func: this.info,
        middlewares: [new AuthGuard()]
      }
    ]);
  }
}
```

4. Функция `getInfo` для получения данных пользователя:

   - Дополнить сервис `UserService` методом `getUserInfo`
   - Метод принимает email, возвращает данные пользователя или `null`
   - В контроллере реализовать логику использования `getUserInfo` для отправки данных о пользователе при успешной авторизации

`users\users.service.interface.ts`

```TypeScript
export interface IUserService {
  ...
  getUserInfo: (email: string) => Promise<UserModel | null>;
}
```

`users\users.service.ts`

```TypeScript
  // Получение информации о пользователе по уникальному идентификатору: email
  // В результата получим пользователя или null (если его нет в БД)
  // Метод не обязательно используется для авторизованных пользователей
  async getUserInfo(email: string): Promise<UserModel | null> {
    return this.usersRepository.find(email);
  }
```

`users\users.controller.ts`

```TypeScript
  async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    // Если выполнен запрос с валидным токеном, Request будет содержать информацию user
    // В случае валидного токена авторизации получим в ответе email: user

    // Получаем дополнительную информацию о пользователе из репозитория
    const userInfo = await this.userService.getUserInfo(user);
    this.ok(res, { email: userInfo?.email, id: userInfo?.id });
  }
```

### Важные моменты:

1. В случае использования асинхронных функций всегда обращать внимание на корректный вызов `next()` чтобы избежать ошибок. Лучше использовать Promise в асинхронном коде, код с использованием Promise лучше читается и не приводит к логическим ошибкам.
2. `Guard` блокирует доступ к роутам для неавторизованных пользователей
3. В случае отсутствия пользователя в базе данных, важно корректно обработать эту ситуацию и отправить соответствующий ответ клиенту.

### Тестирование

```
> npm run dev

> http GET http://localhost:8000/users/info Authorization:"Bearer eyJhbGciOiJ123I1NiIsInXXXCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb2333CJpYXXXOjE3NDcxMjk3MjF9.WmwAl0qtthW6gcsf4iYnQViHXXXgEvu6jOH123IYJKE"

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 32
Content-Type: application/json; charset=utf-8
Date: Wed, 14 May 2025 17:42:21 GMT
ETag: W/"20-AxzlE0B8bFv4mpO2/teO4otUN/Q"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "email": "test@mail.com",
    "id": 1
}
```
