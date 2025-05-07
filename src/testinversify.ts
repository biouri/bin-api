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

// Результат
// B.run()
// A.run()
