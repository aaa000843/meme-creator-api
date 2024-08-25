import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import fs from 'fs';
import ImageKit from 'imagekit';
import { UploadOptions } from 'imagekit/dist/libs/interfaces';
import { UrlOptionsPath } from 'imagekit/dist/libs/interfaces/UrlOptions';
import path from 'path';
import { Picture, PictureDocument } from './picture.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLogger } from '@/common/app.logger';

@Injectable()
export class PictureService {
	readonly logger = new AppLogger(PictureService.name);
	private readonly imagekit: ImageKit;
	private readonly imagekitFolder: string;

	constructor(
		private readonly configService: ConfigService,
		@InjectModel(Picture.name) private readonly pictureModel: Model<Picture>,
	) {
		this.imagekit = new ImageKit({
			publicKey: this.configService.get('IMAGEKIT_PUBLIC_KEY'),
			privateKey: this.configService.get('IMAGEKIT_PRIVATE_KEY'),
			urlEndpoint: this.configService.get('IMAGEKIT_ENDPOINT'),
		});
		this.imagekitFolder = this.configService.get('IMAGE_KIT_FOLDER');
	}

	getSignedUrl(path: string, expireSeconds = 60 * 10, options: Partial<UrlOptionsPath> = {}): string {
		const url = this.imagekit.url({
			...options,
			path,
			expireSeconds,
			signed: true,
		});

		return url;
	}

	async upload(
		image: Buffer | string,
		name: string,
		folder = 'images',
		options: Partial<UploadOptions> = {},
	): Promise<Picture> {
		let buffer: Buffer;
		if (image instanceof Buffer) {
			buffer = image;
		} else if (image.startsWith('http')) {
			const imageResponse = await axios.get(image, {
				responseType: 'arraybuffer',
			});

			buffer = imageResponse.data;
		} else {
			buffer = await fs.promises.readFile(image);
		}

		folder = path.join(this.imagekitFolder, folder);

		const uploadResponse = (await this.imagekit.upload({
			...options,
			file: buffer.toString('base64'),
			fileName: name,
			folder,
		})) as unknown as Picture;

		const pictureInstance = new this.pictureModel(uploadResponse);
		await pictureInstance.save();

		return uploadResponse;
	}

	serializePicture(picture: PictureDocument, isPrivateFile = true) {
		if (!picture) return picture;
		const pictureJson = picture.toJSON ? picture.toJSON() : picture;
		return {
			id: pictureJson._id,
			fileId: pictureJson.fileId,
			name: pictureJson.name,
			size: pictureJson.size,
			filePath: pictureJson.filePath,
			url: this.getSignedUrl(
				pictureJson.filePath,
				isPrivateFile
					? 60 * 10 // 10 min
					: 60 * 60 * 24 * 365 * 10, // 10 years
			),
			fileType: pictureJson.fileType,
			height: pictureJson.height,
			width: pictureJson.width,
			thumbnailUrl: pictureJson.thumbnailUrl,
			createdAt: pictureJson.createdAt,
			updatedAt: pictureJson.updatedAt,
		};
	}
}
