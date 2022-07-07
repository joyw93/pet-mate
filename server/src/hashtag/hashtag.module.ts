import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { HashtagEntity } from './hashtag.entity';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunityEntity,
      CommunityHashtagEntity,
      HashtagEntity,
    ]),
  ],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
