import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture, PictureDocument } from './picture.schema';

@Injectable()
export class PictureRepository {
	model: Model<PictureDocument>;
	constructor(@InjectModel(Picture.name) private readonly pictureModel: Model<PictureDocument>) {
		this.model = pictureModel;
	}

	async save(picture: PictureDocument): Promise<PictureDocument> {
		return new this.pictureModel(picture).save();
	}

	async findById(id: string): Promise<PictureDocument> {
		return this.pictureModel.findById(id).exec();
	}

	async findAll(): Promise<PictureDocument[]> {
		return this.pictureModel.find().exec();
	}

	async deleteById(id: string): Promise<void> {
		await this.pictureModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, updateData: Partial<PictureDocument>): Promise<PictureDocument> {
		return this.pictureModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
	}
}
