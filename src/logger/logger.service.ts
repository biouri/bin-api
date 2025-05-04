import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';

// Абстракция логгера скрывает настройки конфигурации от пользователя
// Также имеется возможность дополнять функционал и расширять методы логгера
// например, отправка сообщений в другие сервисы: sentry / rollbar
// Интефейс ILogger - это некий контракт и мы должны обеспечить его реализацию
// LoggerService должен точно соответствовать описанию контракта ILogger
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		// В новой версии tslog конфигурирование логов происходит через шаблонную строку
		const loggerTemplate = 
			"{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ";
		// Создание логгера
		
		this.logger = new Logger({
			prettyLogTemplate: loggerTemplate
		});
	}

	// log принимает аргументы неизвестного типа
	public log(...args: unknown[]) {
		this.logger.info(...args);
	}

	public error(...args: unknown[]) {
		// Возможны дополнительные Side эффекты:
		// например, отправка в sentry / rollbar
		this.logger.error(...args);
	}

	public warn(...args: unknown[]) {
		this.logger.warn(...args);
	}
}
