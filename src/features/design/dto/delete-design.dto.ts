import { IsString } from 'class-validator';

export class DeleteDesignDto {
	@IsString()
	readonly designId: string;
}
