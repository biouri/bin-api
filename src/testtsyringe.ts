// tsyringe-example.ts
import 'reflect-metadata';
import { container, injectable, inject } from 'tsyringe';

@injectable()
class A {
  run(): void {
    console.log('A.run()');
  }
}

@injectable()
class B {
  constructor(@inject('A') private a: A) {}

  run(): void {
    console.log('B.run()');
    this.a.run();
  }
}

// Регистрируем A под именем "A"
container.register('A', { useClass: A });

// Резолвим B
const b = container.resolve(B);
b.run();
