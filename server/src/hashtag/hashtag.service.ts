import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { Repository } from 'typeorm';
import { HashtagEntity } from './hashtag.entity';
import * as res from '../common/responses/message';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(CommunityHashtagEntity)
    private communityHashtagRepository: Repository<CommunityHashtagEntity>,
    @InjectRepository(HashtagEntity)
    private hashtagRepository: Repository<HashtagEntity>,
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
    @InjectRepository(CommunityLikeEntity)
    private communityLikeRepository: Repository<CommunityLikeEntity>,
  ) {}

  async addTags(post: CommunityEntity, hashtags: string[]) {
    try {
      const result = await Promise.all(
        hashtags.map(async (hashtag: string) => {
          const hashtagFound = await this.hashtagRepository.findOne({
            where: { keyword: hashtag },
          });
          const communityHashtag = new CommunityHashtagEntity();
          communityHashtag.post = post;
          if (!hashtagFound) {
            const newTag = await this.hashtagRepository.save({
              keyword: hashtag,
            });
            communityHashtag.hashtag = newTag;
          } else {
            communityHashtag.hashtag = hashtagFound;
          }
          return await this.communityHashtagRepository.save(communityHashtag);
        }),
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        res.msg.COMMUNITY_ADD_HASHTAG_FAIL,
      );
    }
  }

  async getPosts(keyword: string) {
    const likeCount = this.communityLikeRepository
      .createQueryBuilder()
      .subQuery()
      .select(['post_id', 'COUNT(likes.user_id) AS likeCount'])
      .from(CommunityLikeEntity, 'likes')
      .groupBy('post_id')
      .getQuery();

    const posts = await this.communityRepository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.createdAt',
        'post.views',
        'author.nickname',
        'images.url',
        'tags.id',
        'hashtag.keyword',
        'LikeCount.likeCount',
      ])
      .leftJoin('post.author', 'author')
      .leftJoin('post.images', 'images')
      .leftJoin('post.tags', 'tags')
      .leftJoin('post.likes', 'likes')
      .leftJoin('tags.hashtag', 'hashtag')
      .leftJoin(likeCount, 'LikeCount', 'LikeCount.post_id = post.id')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .where('hashtag.keyword=:keyword', { keyword })
      .getMany();
    return posts;
  }
}
