// Подключается поддержка метаданных (необходима для InversifyJS)
import 'reflect-metadata';
// Модели пользователя из Prisma (из сгенерированной схемы)
import { UserModel } from '@prisma/client';
// Контейнер InversifyJS для внедрения зависимостей
import { Container } from 'inversify';
// Импорт интерфейсов, сущности пользователя, сервиса и типов для DI
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { UserService } from './users.service';
import { User } from './user.entity';

// Мок-объект ConfigService — get реализован как jest.fn(),
// то есть это подделка для тестирования
const ConfigServiceMock: IConfigService = {
  get: jest.fn()
};

// Мок-репозиторий пользователей, с поддельными методами find и create
const UsersRepositoryMock: IUsersRepository = {
  find: jest.fn(),
  create: jest.fn()
};

// Собираем контейнер с ограниченным набором зависимостей
// Создание контейнера для внедрения зависимостей (IoC)
const container = new Container();
// Зависимости, которые будем использовать в контейнере
// Переменные, в которые позже будут внедрены зависимости из контейнера
// Объявляем до beforeAll
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
  // Наполняем контейнер
  // Получаем экземпляры зависимостей
  // Связываются интерфейсы с реализациями:
  // UserService будет создан как обычный класс
  container.bind<IUserService>(TYPES.UserService).to(UserService);
  // Мок-и (ConfigServiceMock и UsersRepositoryMock — как константы)
  // Моки это что-угодно, что соответствует необходимым интерфейсам
  // inversify позволяет выполнять bind на константы toConstantValue
  container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  // Получение всех зависимостей
  configService = container.get<IConfigService>(TYPES.ConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
  usersService = container.get<IUserService>(TYPES.UserService);
});

// beforeEach ... Функция будет выполняться перед каждым тестом
// Переменная для хранения результата создания пользователя.
let createdUser: UserModel | null;

// Описание (describe): что мы тестируем
// Начало группы тестов (describe) и одного теста (it)
// Внутри дополнительно можем описать в it() отдельные тесты:
// 1. Тестирование создания пользователя
describe('User Service', () => {
  it('createUser', async () => {
    // Подделка поведения configService.get() — вернёт '1' при первом вызове
    configService.get = jest.fn().mockReturnValueOnce('1');
    // Подделка usersRepository.create() — вернёт объект UserModel,
    // как будто пользователь успешно создан
    usersRepository.create = jest.fn().mockImplementationOnce(
      (user: User): UserModel => ({
        name: user.name,
        email: user.email,
        password: user.password,
        id: 1
      })
    );
    // Вызов тестируемого метода createUser() с тестовыми данными
    createdUser = await usersService.createUser({
      email: 'a@a.ru',
      name: 'Антон',
      password: '1'
    });

    // Проверки:
    // ID должен быть 1.
    // Пароль не должен быть '1', то есть ожидается,
    // что пароль был захеширован внутри сервиса.
    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual('1');
  });

  // 2. Тестирование метода validateUser
  it('validateUser - success', async () => {
    // Для тестирования потребуется замокать создание пользователя однократно
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    // validateUser принимает DTO с данными как при создании пользователя
    const res = await usersService.validateUser({
      email: 'a@a.ru',
      password: '1'
    });
    // Ожидаем в результате true
    expect(res).toBeTruthy();
  });

  // 3. Тестирование validateUser если пароль отличается
  it('validateUser - wrong password', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    // validateUser принимает DTO с другими данными (пароль отличается)
    const res = await usersService.validateUser({
      email: 'a@a.ru',
      password: '2'
    });
    // Ожидаем в результате false
    expect(res).toBeFalsy();
  });

  // 4. Тестирование validateUser нет пользователя
  it('validateUser - wrong user', async () => {
    // Для тестирования замокать отсутствие пользователя однократно
    usersRepository.find = jest.fn().mockReturnValueOnce(null);
    // Независимо от входных DTO данных пользователя нет в любом случае
    const res = await usersService.validateUser({
      email: 'a2@a.ru',
      password: '2'
    });
    // Ожидаем в результате false
    expect(res).toBeFalsy();
  });
});
