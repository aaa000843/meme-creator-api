import { IsString, IsNumber, IsNested } from '@hippo-oss/nest-dto/openapi';

export class PictureVersionInfoDto {
	@IsString()
	id: string;

	@IsString()
	name: string;
}

export class PictureDto {
	@IsString()
	fileId: string;

	@IsString()
	name: string;

	@IsNumber()
	size: number;

	@IsNested({ type: PictureVersionInfoDto, optional: true, nullable: true })
	versionInfo?: PictureVersionInfoDto;

	@IsString()
	filePath: string;

	@IsString()
	url: string;

	@IsString()
	fileType: string;

	@IsNumber()
	height: number;

	@IsNumber()
	width: number;

	@IsNumber({ optional: true, nullable: true })
	orientation?: number;

	@IsString()
	thumbnailUrl: string;
}
