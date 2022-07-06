import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommunityController } from './community.controller';
import { CommunityEntity } from './community.entity';
import { CommunityService } from './community.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunityEntity,
      CommunityCommentEntity,
      CommunityLikeEntity,
      UserEntity,
    ]),
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
