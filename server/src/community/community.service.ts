import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(CommunityLikeEntity)
    private CommunityLikeRepository: Repository<CommunityLikeEntity>,
  ) {}

  async createPost(userId: number, createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;
    const user = await this.UserRepository.findOne({ where: { id: userId } });
    const post = new CommunityEntity();
    post.title = title;
    post.content = content;
    post.author = user;
    try {
      return await this.communityRepository.save(post);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async likePost(userId: number, postId: number) {
    const user = await this.UserRepository.findOne({ where: { id: userId } });
    const post = await this.communityRepository.findOne({
      where: { id: postId },
    });
    const communityLike = new CommunityLikeEntity();
    communityLike.auth = user;
    communityLike.post = post;
    try {
      return await this.CommunityLikeRepository.save(communityLike);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
