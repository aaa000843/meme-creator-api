import { config } from 'dotenv';
config();
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import ErrorCodes from './error-codes.json';
import { Logger } from 'nestjs-pino';

import {
	BusinessError,
	ErrorsInterceptor,
	IError,
	JoiValidationPipe,
	ParseJsonPipe,
	_flatMap,
	setupSwagger,
} from 'nest-common';

BusinessError.ErrorCodes = ErrorCodes as { [key: string]: IError };

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['debug'],
		bufferLogs: false,
		autoFlushLogs: true,
	});
	const globalPrefix = process.env.GLOBAL_PREFIX || 'api/v1';

	app.useLogger(app.get(Logger));
	BusinessError.logger = app.get(Logger);
	app.setGlobalPrefix(globalPrefix);
	const port = process.env.PORT || 3000;

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			whitelist: true,
			skipNullProperties: false,
			forbidNonWhitelisted: true,
			exceptionFactory: (errors) => {
				const constraints = errors.map((error) => Object.values(error.constraints || {})).filter(Boolean);
				for (const error of errors) {
					if (error.children?.length > 0) {
						for (const child of error.children) {
							constraints.push(Object.values(child.constraints || {}));
						}
					}
				}
				const messages = _flatMap(constraints);

				return new BusinessError('VALIDATION_ERROR', messages.join(', '), {
					message: messages,
				});
			},
		}),
		new ParseJsonPipe(),
		new JoiValidationPipe(),
	);

	app.useGlobalInterceptors(new ErrorsInterceptor());
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	app.enableCors();

	setupSwagger(app, globalPrefix);
	await app.listen(port);
	app.get(Logger).log(`🚀 API is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
