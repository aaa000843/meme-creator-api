import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Design } from './design.schema';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';

@Injectable()
export class DesignService {
	constructor(@InjectModel(Design.name) private readonly designModel: Model<Design>) {}

	async create(createDesignDto: CreateDesignDto, userId: string): Promise<Design> {
		const createdDesign = new this.designModel({ ...createDesignDto, userId });
		return createdDesign.save();
	}

	async update(designId: string, updateDesignDto: UpdateDesignDto): Promise<Design> {
		const updatedDesign = await this.designModel.findByIdAndUpdate(designId, updateDesignDto, { new: true });
		if (!updatedDesign) {
			throw new NotFoundException(`Design with ID ${designId} not found`);
		}
		return updatedDesign;
	}

	async remove(designId: string): Promise<void> {
		const result = await this.designModel.findByIdAndDelete(designId);
		if (!result) {
			throw new NotFoundException(`Design with ID ${designId} not found`);
		}
	}
}
