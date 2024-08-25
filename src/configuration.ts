import Joi from 'joi';

export const ConfigurationSchema = Joi.object({
	/* General */
	ENVIRONMENT: Joi.string().default('development').description('The environment the application is running in'),
	PORT: Joi.number().default(3000).description('The port the application will listen to'),
	/* Database */
	MONGODB_URI: Joi.string().required(),
	SWAGGER: Joi.string().default('true'),
	API_URL: Joi.string().required(),
	SENDGRID_API_KEY: Joi.string().required(),
	JWT_SECRET: Joi.string().required(),

	// Imagekit
	IMAGEKIT_PUBLIC_KEY: Joi.string().required(),
	IMAGEKIT_PRIVATE_KEY: Joi.string().required(),
	IMAGEKIT_ENDPOINT: Joi.string().required(),
	IMAGE_KIT_FOLDER: Joi.string().required(),
});
