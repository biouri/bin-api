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

let s = '5';
// Явное приведение типов к Number
n = a + Number(s); // 10

// Массивы
let names: string[] = ['abc', 'def']; // Массив строк
let numbers: number[] = [1, 2, 3]; // Объявление массива чисел

// Tuples (Кортежи)
// Определение и использование tuple
let tuple: [number, string] = [2, "текст"];
tuple.push('abcdef'); // Добавление элементов
console.log(tuple); // [ 2, 'текст', 'abcdef' ]

// Any
// Использование `any` для обозначения любого типа
// Не рекомендуется к использованию из-за отсутствия типовой безопасности
let anything: any = 3; // Желательно явно указать что это тип any
anything = "теперь я строка";
anything = true; // Может быть преобразован в любой тип

let anyArr: any[] = ['abc', 3, true]; // Массив с элементами любых типов

// Функции
// Типизация аргументов и возвращаемого значения
// Пример функции, принимающей строку и возвращающей строку
function greet(name: string): string {
  return name + " привет!";
}

// Типизация анонимных функций, пример типизации аргумента функцииы
names.map((x: string) => x);

// Объектные типы (обычно вместо такой записи используются интерфейсы)
function getCoordinates(): { latitude: number; longitude: number } {
  return { latitude: 34.5, longitude: -123.1 };
}


// Union тип

// Переменная, которая может быть или числом, или строкой
let universalId: number | string = 5;
universalId = 'abc';

// Функции могут принимать параметры Union типов
function printId(id: number | string) {
    // console.log(id.toUpperCase()); // Ошибка, это может быть number

    // Использование `typeof` для проверки типа во время выполнения
    // Пример: преобразование строки в верхний регистр если тип `string`
    // Сужение типов при помощи проверки типов Type guards
    if (typeof id == 'string') {
        console.log(id.toUpperCase()); // Строка в верхнем регистре
    } else {
        console.log(id); // Число
    }
}

// Функция, которая может принять один string-параметр, или массив
function helloUser(user: string | string[]) {
    if (Array.isArray(user)) {
        console.log(user.join(', ' + 'Hi!')); // Массив строк user[]
    } else {
        console.log(user + 'Hi!'); // Строка user
    }
}


// Type Aliases

// Создание типа для координат coord позволяет переиспользовать типы
type coord = { latitude: number; longitude: number }

// Type Aliases часто используются вместо Объектных типов
function getCoordinates2(): coord {
  return { latitude: 34.5, longitude: -123.1 };
}


// Интерфейсы

// Есть соглашение для интерфейсов по форме записи чтобы отличать от классов
// Соглашение не всегда используется и зависит от договоренностей разработчиков
interface ICoord { 
    latitude: number; 
    longitude: number
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
    name: 'Charli'
}

// Аналогичный пример на основе типов для растения
type Plant = { 
    name: string 
};

// Используется объединение типов & 
// Tree будет содержать как свойство name так и color
type Tree = Plant & {
    color?: string
}

// Создание реальных объектов
const tree: Tree = {
    name: 'Дуб',
    color: 'Темно-зеленый'
}

const tree2: Tree = {
    name: 'Ель'
}

// Интерфейсы можно объединять/merge т.е. всегда можно дополнить
// (типы не могут учавствовать в слиянии определений, возникнет ошибка)
// Пример, как можно дополнить существующий интерфейс Dog (создан выше)
// В интерфейс Dog добавляется опциональное свойство color?
interface Dog {
    color?: string;
};

const dog2: Dog = {
    name: 'Bob',
    tail: true,
    color: 'Black'
}


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


// Enum

// Для сравнения со строковым литеральным типом
// type direction = 'left' | 'right';

// Числовые Enum
// По умолчанию значения Enum начинаются с `0`
// Можно изменить начальное значение Direction.left = 0
// Значения можно изменять, например, для отправки json
enum Direction {
  left = 10, // Изменилось значение по умолчанию на 10
  right      // right = 11, назначено автоматически
}

// Это позволяет обращаться к Enum значениям как 
const d1 = Direction.left;
const d2 = Direction.right;

// Строковые Enum
// Можно явно указать строковое значение 
// для каждого элемента Enum
enum DirectionStr {
  left = 'LEFT',  // Изменение значения по умолчанию для left
  right = 'RIGHT' // Для строковых Enum нужно задать все значения
}

// Гетерогенные Enum
// Могут содержать как числовые, так и строковые значения, 
// на практике редко используются
enum DirectionNumStr {
  left = 1,  // Изменение значения по умолчанию на 1
  right = 'RIGHT' // Можно указать значения другого типа 'RIGHT'
}

// Расчётные значения
// Enum могут иметь расчётные значения, 
// эти значения должны быть определены на момент компиляции
enum DirectionCalc {
  left = '1234'.length, // Изменилось значение на расчётное
  right = '12'.length   // Значение вычисляется при инициализации
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
function objMod(obj: {left: number}) {
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

logUni2<string, number>('str', [1,2,3]);

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
