import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCommentLikeEntity } from 'src/common/entities/community-comment-like.entity';
import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityImageEntity } from 'src/common/entities/community-image.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { SanchaekCommentLikeEntity } from 'src/common/entities/sanchaek-comment-like.entity';
import { SanchaekCommentEntity } from 'src/common/entities/sanchaek-comment.entity';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekLikeEntity } from 'src/common/entities/sanchaek-like.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { CommunityService } from 'src/community/community.service';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import { SanchaekService } from 'src/sanchaek/sanchaek.service';
import { UserEntity } from 'src/user/user.entity';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    CommunityEntity,
    CommunityCommentEntity,
    CommunityLikeEntity,
    CommunityHashtagEntity,
    CommunityImageEntity,
    CommunityCommentLikeEntity,
    SanchaekEntity,
    SanchaekMapEntity,
    SanchaekImageEntity,
    SanchaekCommentEntity,
    SanchaekLikeEntity,
    SanchaekCommentLikeEntity,
    HashtagEntity,
    UserEntity,
    UserProfileEntity
  ])],
  controllers: [SearchController],
  providers: [SearchService, CommunityService, SanchaekService]
})
export class SearchModule {}
