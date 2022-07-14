import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { Repository } from 'typeorm';
import { HashtagEntity } from './hashtag.entity';
import * as res from '../common/responses/message';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(CommunityHashtagEntity)
    private communityHashtagRepository: Repository<CommunityHashtagEntity>,
    @InjectRepository(HashtagEntity)
    private hashtagRepository: Repository<HashtagEntity>,
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
      throw new InternalServerErrorException(res.msg.ADD_HASHTAG_FAIL);
    }
  }

  async getPosts(tag: string) {
    const posts = await this.hashtagRepository
      .createQueryBuilder('hashtag')
      .leftJoinAndSelect('hashtag.tags', 'tag')
      .leftJoinAndSelect('tag.post', 'post')
      .where('hashtag.tag = :tag', { tag })
      .getMany();
    return posts;
  }
}
