import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('Users e2e', () => {
  // 1. Ошибка регистрации
  it('Register - error', async () => {
    // Обычно supertest импортируют как request
    // в request необходимо передать экземпляр приложения
    // Используется цепочка вызовов .post .send .expect
    const res = await request(application.app)
      .post('/users/register')
      .send({ email: 'a@a.ru', name: 'Test', password: 'password' });

    // Проверка результата запроса
    expect(res.statusCode).toBe(422);
  });

  // 2. Успешный Login:
  // отправка корректных данных логина и пароля; ожидаем приход JWT токена
  it('Login - success', async () => {
    const res = await request(application.app)
      .post('/users/login')
      .send({ email: 'a@a.ru', password: 'password' });
    expect(res.body.jwt).not.toBeUndefined();
  });

  // 3. Неуспешный логин:
  // отправка неверных данных; ожидаем получение ошибки 401
  it('Login - error', async () => {
    const res = await request(application.app)
      .post('/users/login')
      .send({ email: 'a@a.ru', password: 'NOT-CORRECT-PASSWORD' });
    expect(res.statusCode).toBe(401);
  });

  // 4. Успешное получение информации по токену:
  // после логина отправляем JWT токен в хедерах; проверяем полученный email
  it('Info - success', async () => {
    const login = await request(application.app)
      .post('/users/login')
      .send({ email: 'a@a.ru', password: 'password' });
    const res = await request(application.app)
      .get('/users/info')
      .set('Authorization', `Bearer ${login.body.jwt}`);
    expect(res.body.email).toBe('a@a.ru');
  });

  // 5. Некорректный токен
  // Неуспешное получение информации: используем невалидный токен; ожидаем ошибку с кодом 401
  it('Info - error', async () => {
    const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`);
    expect(res.statusCode).toBe(401);
  });
});

// После всех тестов завершить приложение
afterAll(() => {
  application.close();
});
