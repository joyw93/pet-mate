import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { HashtagEntity } from './hashtag.entity';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunityEntity,
      CommunityHashtagEntity,
      CommunityLikeEntity,
      HashtagEntity,
    ]),
  ],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
