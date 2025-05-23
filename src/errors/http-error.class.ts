// HTTPError это расширенный класс от обычной ошибки Error
// Обычная практика создания кастомных классов ошибок
// Дополнительно добавляются statusCode и context?
export class HTTPError extends Error {
  statusCode: number;
  context?: string;

  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.context = context;
  }
}
