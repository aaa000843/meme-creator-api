import { AssetVisibility } from '@/features/picture/picture.schema';
import { IsEnum, IsBoolean, IsDateString, IsString } from '@hippo-oss/nest-dto/openapi';

export class UpdateAssetDto {
	@IsEnum({ enum: AssetVisibility, optional: true })
	visibility?: AssetVisibility;

	@IsString({ isArray: true, optional: true })
	tags?: string[];

	@IsBoolean({ optional: true })
	isTrashed?: boolean;

	@IsDateString({ optional: true })
	trashedAt?: Date | null;
}
