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
