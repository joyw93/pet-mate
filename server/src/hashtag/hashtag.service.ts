import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { CreatePostDto } from 'src/community/dto/create-post.dto';
import { Repository } from 'typeorm';
import { HashtagEntity } from './hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(CommunityHashtagEntity)
    private communityHashtagRepository: Repository<CommunityHashtagEntity>,
    @InjectRepository(HashtagEntity)
    private hashtagRepository: Repository<HashtagEntity>,
  ) {}

  async addTags(post: CommunityEntity, createPostDto: CreatePostDto) {
    const { hashtags } = createPostDto;
    const result = hashtags.map(async (hashtag) => {
      const hashtagFound = await this.hashtagRepository.findOne({
        where: { tag: hashtag },
      });
      const communityHashtag = new CommunityHashtagEntity();
      communityHashtag.post = post;
      if (!hashtagFound) {
        const newTag = await this.hashtagRepository.save({ tag: hashtag });
        communityHashtag.hashtag = newTag;
      } else {
        communityHashtag.hashtag = hashtagFound;
      }
      await this.communityHashtagRepository.save(communityHashtag);
    });
    return result;
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
