import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
// Создание приложения Express = вызов функции express()
const app = express();

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
const cb = (req: Request, res: Response, next: NextFunction): void => {
  console.log('Extra CallBack');
  next();
};

// Дополнительный CallBack 2
const cb2 = (req: Request, res: Response, next: NextFunction): void => {
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

// Привязка роутера userRouter к корневому роуту '/users' основного приложения
// позволяет обрабатывать запросы к '/users/login' и '/users/register' ...
app.use('/users', userRouter);

// Тестирование ответов клиенту
app.get('/test', (req, res) => {
  // Задать специфичные типы содержимого ответа, например, HTML или JSON
  res.type('application/json');
  // res.location('...');
  // res.links({
  // 	next: '...'
  // });
  // Установка cookie (например, token для авторизации)
  res.cookie('token', 'abcdefgh', {
    domain: '',
    path: '/',
    secure: true,
    // expires: new Date(Date.now() + 600000) // 10 минут от текущего времени
    maxAge: 600000 // Альтернатива expires: использовать maxAge 10 минут
  });
  // Пример очистки cookie token (когда пользователь выходит из системы)
  // res.clearCookie('token');
  // res.send('Привет!');
  // Если нечего возвращать, желательно установить status и завершить обработоку end()
  // Если status не указан, он будет 200
  // res.status(404).end();
  res.end();
});

// Пример маршрута с ошибкой
app.get('/example', (res, req) => {
  throw new Error('Example Error!!!');
});

// Обработчик ошибок должен быть добавлен после всех объявлений app.use
// Можно обработать код ошибки, тип ошибки, модифицировать ответ, напримр json...
// Вместо next() отвечать желательно каким-нибудь статусом, например:
// 401 - неавторизован, 500 - ошибка сервера...
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(401).send(err.message);
});

// Создание сервера
// Приложение прослушивает запросы на port в бесконечном цикле
app.listen(port, () => {
  console.log(`Сервер Express запущен на http://localhost:${port}`);
});
