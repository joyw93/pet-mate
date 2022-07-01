import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
  ) {}

  async createPost(userId: number, createPostDto: CreatePostDto) {
    try {
      const post = await this.communityRepository.save({
        ...createPostDto,
        userId,
      });
      return post;
    } catch (err) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
