import { AssetVisibility } from '@/features/picture/picture.schema';
import { IsBoolean, IsEnum, IsString } from '@hippo-oss/nest-dto/openapi';

export class FilterAssetsDto {
	@IsEnum({ enum: AssetVisibility, optional: true })
	visibility?: AssetVisibility;

	@IsString({ optional: true, isArray: true })
	tags?: string[];

	@IsBoolean({ optional: true })
	isTrashed?: boolean;
}
