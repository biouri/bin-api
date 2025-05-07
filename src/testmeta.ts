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

// Декоратор класса шаблон-пример
// Использует связь ключа с объектом
// function Injectable(key: string) {
//   return (target: Function) => {
//     Reflect.defineMetadata(key, 1, target);
//     const meta = Reflect.getMetadata(key, target);
//     console.log(meta);
//   }
// }

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

// Декоратор свойства
// function Prop(
//     target: Object,
//     propertyKey: string
// ) {

// }

@Test
class C {
  // @Prop prop: number;

  // @Method
  method() {
    // ...
  }
}
