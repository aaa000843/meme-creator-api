// src/designs/designs.controller.ts
import { Controller, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { DesignService } from './design.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/guards/jwt-auth.guard';

@ApiTags('designs')
@Controller('designs')
export class DesignController {
	constructor(private readonly designsService: DesignService) {}
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'create design' })
	@Post()
	async create(@Body() createDesignDto: CreateDesignDto, @Req() req: any) {
		// Assuming userId is extracted from the request object
		return this.designsService.create(createDesignDto, req.user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Update design' })
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateDesignDto: UpdateDesignDto) {
		return this.designsService.update(id, updateDesignDto);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'remove design' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.designsService.remove(id);
	}
}
