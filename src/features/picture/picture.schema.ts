import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PictureDocument = Document & Picture;

export enum AssetVisibility {
	ADMIN_ONLY = 'admin',
	PUBLIC = 'public',
	PRIVATE = 'private',
	PAID = 'paid',
}

@Schema({ timestamps: true })
export class Picture {
	@Prop()
	fileId: string;

	@Prop()
	name: string;

	@Prop()
	size: number;

	@Prop({ type: { id: String, name: String } })
	versionInfo: { id: string; name: string };

	@Prop()
	filePath: string;

	@Prop()
	url: string;

	@Prop()
	fileType: string;

	@Prop()
	height: number;

	@Prop()
	width: number;

	@Prop()
	orientation?: number;

	@Prop()
	thumbnailUrl: string;

	@Prop()
	updatedAt: Date;

	@Prop()
	createdAt: Date;

	@Prop({ type: [String], index: true })
	tags: string[];

	@Prop({ type: String, enum: AssetVisibility, default: AssetVisibility.PRIVATE })
	visibility: AssetVisibility;

	@Prop({ default: false })
	isTrashed: boolean;

	@Prop({ type: Date, default: null })
	trashedAt: Date | null;

	constructor(data?: Partial<Picture>) {
		data.versionInfo = undefined;
		Object.assign(this, data || {});
	}
}

export const PictureSchema = SchemaFactory.createForClass(Picture);
