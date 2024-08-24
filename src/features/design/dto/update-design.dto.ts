import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateDesignDto {
	@ApiProperty({
		description: 'The name of the design',
		example: 'Updated Design Name',
		required: false,
	})
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty({
		description: 'The content of the design in JSON format',
		example: '{"type": "text", "content": "Updated Content"}',
		required: false,
	})
	@IsOptional()
	@IsObject()
	content?: Record<string, any>;
}
