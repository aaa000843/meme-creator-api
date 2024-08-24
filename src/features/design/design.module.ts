// src/designs/designs.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignController } from './design.controller';
import { DesignService } from './design.service';
import { Design, DesignSchema } from './design.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Design.name, schema: DesignSchema }])],
	controllers: [DesignController],
	providers: [DesignService],
	exports: [DesignService],
})
export class DesignModule {}
