import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CommunityLikeEntity)
    private communityLikeRepository: Repository<CommunityLikeEntity>,
    @InjectRepository(CommunityCommentEntity)
    private communityCommentRepository: Repository<CommunityCommentEntity>,
    @InjectRepository(HashtagEntity)
    private hashtagRepository: Repository<HashtagEntity>,
    @InjectRepository(CommunityHashtagEntity)
    private communityHashtagRepository: Repository<CommunityHashtagEntity>,
  ) {}

  async getPosts(offset: number, postCount: number) {
    try {
      if (postCount) {
        return await this.communityRepository.find({
          skip: offset,
          take: postCount,
        });
      } else {
        return await this.communityRepository.find();
      }
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async getOnePost(postId: number) {
    try {
      return await this.communityRepository.findOne({ where: { id: postId } });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async getHotPosts() {
    try {
      const posts = this.communityLikeRepository
        .createQueryBuilder('like')
        .select(['post_id', 'post.title, post.content'])
        .addSelect('COUNT(post_id)', 'likeCount')
        .groupBy('like.post_id')
        .leftJoin('like.post', 'post')
        .take(3)
        .getRawMany();
      return posts;
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async createPost(userId: number, createPostDto: CreatePostDto) {
    try {
      const { title, content, hashtags } = createPostDto;
      const user = await this.userRepository.findOne({ where: { id: userId } });
      
      const post = new CommunityEntity();
      post.title = title;
      post.content = content;
      post.author = user;
      
      return await this.communityRepository.save(post);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async editPost(postId: number, editPostDto: EditPostDto) {
    try {
      const { title, content } = editPostDto;
      const oldPost = await this.communityRepository.findOne({
        where: { id: postId },
      });
      const newPost = { ...oldPost, title, content };
      return await this.communityRepository.save(newPost);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async deletePost(postId: number) {
    try {
      return await this.communityRepository.delete(postId);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async likePost(userId: number, postId: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const post = await this.communityRepository.findOne({
        where: { id: postId },
      });                           
      const communityLike = new CommunityLikeEntity();
      communityLike.author = user;
      communityLike.post = post;
      return await this.communityLikeRepository.save(communityLike);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async getAllComments(postId: number) {
    try {
      return await this.communityRepository.find({
        where: { id: postId },
        relations: ['comments'],
      });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async createComment(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
  ) {
    try {
      const { title, content } = createCommentDto;
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const post = await this.communityRepository.findOne({
        where: { id: postId },
      });
      const comment = new CommunityCommentEntity();
      comment.author = user;
      comment.post = post;
      comment.title = title;
      comment.content = content;
      return await this.communityCommentRepository.save(comment);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async editComment(commentId: number, content: string) {
    try {
      const oldComment = await this.communityCommentRepository.findOne({
        where: { id: commentId },
      });
      const newComment = { ...oldComment, content };
      return await this.communityCommentRepository.save(newComment);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async deleteComment(commentId: number) {
    try {
      return await this.communityCommentRepository.delete(commentId);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
