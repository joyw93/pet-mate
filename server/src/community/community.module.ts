import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityImageEntity } from 'src/common/entities/community-image.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { HashtagService } from 'src/hashtag/hashtag.service';
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
      CommunityHashtagEntity,
      CommunityImageEntity,
      HashtagEntity,
      UserEntity,
    ]),
  ],
  controllers: [CommunityController],
  providers: [CommunityService, HashtagService],
})
export class CommunityModule {}
