import { Body, Controller, Post, UnsupportedMediaTypeException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { PictureService } from './picture.service';

export const IMAGE_KIT_MAX_FILE_SIZE = 1024 * 1024 * 10;
@ApiTags('Picture')
@Controller('pictures')
export class PictureController {
	constructor(private readonly service: PictureService) {}

	@Post('/upload')
	@ApiOperation({
		summary: 'Upload image. Supported extensions: jpeg, png, webp',
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				image: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('image', {
			storage: memoryStorage(),
			fileFilter: (_, file, cb) => {
				if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype)) {
					cb(new UnsupportedMediaTypeException(), false);
				} else {
					cb(null, true);
				}
			},
			limits: { fileSize: IMAGE_KIT_MAX_FILE_SIZE },
			preservePath: true,
		}),
	)
	async upload(@UploadedFile() file: Express.Multer.File, @Body('folder') folder: string) {
		const uploadResponse = await this.service.upload(file.buffer, file.originalname, folder);
		return uploadResponse;
	}
}
