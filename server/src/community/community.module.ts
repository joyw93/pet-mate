import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityController } from './community.controller';
import { CommunityEntity } from './community.entity';
import { CommunityService } from './community.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityEntity])],
  controllers: [CommunityController],
  providers: [CommunityService]
})
export class CommunityModule {}
