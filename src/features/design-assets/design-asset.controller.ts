import { Controller, Get, Patch, Param, Query, Body } from '@nestjs/common';
import { DesignAssetService } from './design-asset.service';
import { PictureDocument } from '../picture/picture.schema';
import { FilterAssetsDto } from './dto/filter.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Design Assets')
@Controller('design-assets')
export class DesignAssetController {
	constructor(private readonly designAssetService: DesignAssetService) {}

	@Get()
	async getAllAssets(@Query() filterDto: FilterAssetsDto): Promise<PictureDocument[]> {
		return this.designAssetService.getAllAssets(filterDto);
	}

	@Get(':id')
	async getAssetById(@Param('id') id: string): Promise<PictureDocument> {
		return this.designAssetService.getAssetById(id);
	}

	@Patch(':id')
	async updateAsset(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto): Promise<PictureDocument> {
		return this.designAssetService.updateAsset(id, updateAssetDto);
	}
}
