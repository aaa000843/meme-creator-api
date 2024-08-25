import { Module } from '@nestjs/common';
import { DesignAssetService } from './design-asset.service';
import { PictureModule } from '../picture/picture.module';
import { DesignAssetController } from './design-asset.controller';

@Module({
	imports: [PictureModule],
	providers: [DesignAssetService],
	controllers: [DesignAssetController],
})
export class DesignAssetModule {}
