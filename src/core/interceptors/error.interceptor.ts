import { AppLogger } from '@/common/app.logger';
import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BusinessError } from 'src/common/business-error';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
	private readonly logger = new AppLogger(ErrorsInterceptor.name);
	intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
		return next.handle().pipe(
			catchError((error) =>
				throwError(() => {
					if (error instanceof BusinessError) {
						const errorResponse = {
							statusCode: error.httpStatusCode,
							timestamp: new Date().toISOString(),
							errorCode: error.errorCode,
							message: error.message,
							context: error.context,
						};

						if (error.logLevel !== 'off') {
							this.logger[error.logLevel]({
								stack: error.stack,
								...errorResponse,
							});
						}
						return new HttpException(errorResponse, error.httpStatusCode);
					}
					if (error instanceof HttpException) {
						const errorResponse = {
							statusCode: error.getStatus(),
							timestamp: new Date().toISOString(),
							message: error.message,
							error: error.getResponse(),
						};
						if (error.getStatus() >= 400 && error.getStatus() < 500) {
							this.logger.warn({
								stack: error.stack,
								...errorResponse,
							});
						} else {
							this.logger.error({
								stack: error.stack,
								...errorResponse,
							});
						}
						return new HttpException(errorResponse, error.getStatus());
					}

					this.logger.error(error);

					return new InternalServerErrorException(error);
				}),
			),
		);
	}
}
