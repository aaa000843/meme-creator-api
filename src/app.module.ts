import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationSchema } from './configuration';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalJwtModule } from './features/shared/global-jwt.module';
import { DesignModule } from './features/design/design.module';
import { PictureModule } from './features/picture/picture.module';
import { DesignAssetModule } from './features/design-assets/design-asset.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: ConfigurationSchema,
			validationOptions: {
				abortEarly: true,
			},
		}),
		GlobalJwtModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					uri: config.get<string>('MONGODB_URI'),
					autoCreate: true,
				};
			},
		}),
		UserModule,
		AuthModule,
		DesignModule,
		PictureModule,
		DesignAssetModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
