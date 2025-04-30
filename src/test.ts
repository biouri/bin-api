// Тестирование TypeScript
// Файл не является частью проекта, используется только для экспериментов

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
    message = "1";
    latitude: number;
    longitude: number;

    // protected метод дотупен в классе-родителе и наследнике
    // но недоступен в экземпляре (инстансе)
    protected test() {
        if(this.latitude > 0) {
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
    message = "2";
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

    private a = "PRIVATE";
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
    static a = "555";

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


// TypeOf позволяет получить тип переменной
let hello = "Привет";

// С помощью TypeOf мы можем выполнить проверку 

if (typeof hello == 'string') {
    // ....
}

// И присвоить этот тип другой переменной 
// Сделать переменную other с таким же типом как у a
let other: typeof hello = "other тоже строка";

// KeyOf: используется для создания типа, 
// который может принимать значение только из ключей другого типа. 
type Coord = {
    latitude: number,
    longitude: number
}

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
