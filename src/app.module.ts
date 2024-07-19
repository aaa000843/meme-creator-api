import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationSchema } from './configuration';
import { NestLoggerModule, ReqLogMiddleware } from 'nest-common';

@Module({
	imports: [
		NestLoggerModule,
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: ConfigurationSchema,
			validationOptions: {
				abortEarly: true,
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(ReqLogMiddleware).forRoutes('*');
	}
}
