import { compare, hash } from 'bcryptjs'; // Используем асинхронную функцию hash
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
  public async setPassword(pass: string, salt: number): Promise<void> {
    // В дальнейшем вторым параметром будет соль, которая хранится в конфигурации
    // Сохраняем захешированный пароль
    this._password = await hash(pass, salt);
  }

  public async comparePassword(pass: string): Promise<boolean> {
    return compare(pass, this._password);
  }
}
