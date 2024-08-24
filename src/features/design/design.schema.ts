// // src/designs/schemas/design.schema.ts
// import mongoose, { Schema, Document, mongo } from 'mongoose';

// export interface Design extends Document {
// 	userId: string;
// 	name: string;
// 	content: Record<string, any>; // Changed from string to JSON
// }

// export const DesignSchema = new Schema<Design>({
// 	userId: { type: String, required: true },
// 	name: { type: String, required: true },
// 	content: { type: Schema.Types.Mixed, required: true }, // Define content as a mixed type
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DesignDocument = Design & Document;

@Schema({ timestamps: true })
export class Design {
	@Prop({ required: true, unique: true, type: mongoose.Types.ObjectId })
	userId: mongoose.Types.ObjectId;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true, type: mongoose.Schema.Types.Mixed })
	content: Record<string, any>;
}

export const DesignSchema = SchemaFactory.createForClass(Design);
