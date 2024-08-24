import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CreateDesignDto {
	@ApiProperty({
		description: 'The user ID who is creating the design',
		example: '607c191e810c19729de860ea',
	})
	@IsString()
	userId: string;

	@ApiProperty({
		description: 'The name of the design',
		example: 'My New Design',
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: 'The content of the design in JSON format',
		example: '{"type": "text", "content": "Hello World"}',
	})
	@IsObject()
	content: Record<string, any>;
}
