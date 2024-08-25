import { Injectable } from '@nestjs/common';
import { FilterAssetsDto } from './dto/filter.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PictureRepository } from '../picture/picture.repository';
import { PictureDocument } from '../picture/picture.schema';

@Injectable()
export class DesignAssetService {
	constructor(private pictureRepository: PictureRepository) {}

	async getAllAssets(filterDto: FilterAssetsDto): Promise<PictureDocument[]> {
		const { visibility, tags, isTrashed } = filterDto;
		const filter: any = {};

		if (visibility) {
			filter.visibility = visibility;
		}
		if (tags && tags.length > 0) {
			filter.tags = { $in: tags };
		}
		if (isTrashed !== undefined) {
			filter.isTrashed = isTrashed;
		}

		return this.pictureRepository.model.find(filter).exec();
	}

	async getAssetById(id: string): Promise<PictureDocument> {
		return this.pictureRepository.model.findById(id).exec();
	}

	async updateAsset(id: string, updateAssetDto: UpdateAssetDto): Promise<PictureDocument> {
		return this.pictureRepository.model.findByIdAndUpdate(id, updateAssetDto, { new: true }).exec();
	}
}
