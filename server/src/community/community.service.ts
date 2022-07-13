import * as AWS from 'aws-sdk';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { CommunityImageEntity } from 'src/common/entities/community-image.entity';
import * as res from '../common/responses/message';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

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
    @InjectRepository(CommunityImageEntity)
    private communityImageRepository: Repository<CommunityImageEntity>,
  ) {}

  async getPosts(offset: number, postCount: number, orderBy: string) {
    let cond;
    if (orderBy === 'new') {
      cond = { 'post.createdAt': 'DESC' };
    } else if (orderBy === 'old') {
      cond = { 'post.createdAt': 'ASC' };
    }
    try {
      const posts = this.communityRepository
        .createQueryBuilder('post')
        .select([
          'post.id',
          'post.title',
          'post.content',
          'post.createdAt',
          'author.nickname',
          'images.url',
          'tags.id',
          'hashtag.keyword',
        ])
        .leftJoin('post.author', 'author')
        .leftJoin('post.images', 'images')
        .leftJoin('post.tags', 'tags')
        .leftJoin('tags.hashtag', 'hashtag')
        .skip(offset)
        .take(postCount)
        .orderBy(cond)
        .getMany();
      return posts;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.GET_POST_FAIL);
    }
  }

  async getOnePost(postId: number) {
    const post = await this.communityRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(res.msg.POST_NOT_EXIST);
    }
    try {
      const post = this.communityRepository
        .createQueryBuilder('post')
        .select([
          'post.id',
          'post.title',
          'post.content',
          'post.createdAt',
          'author.nickname',
          'images.id',
          'images.url',
          'comments.id',
          'comments.content',
          'comments.createdAt',
          'commentAuthor.nickname',
          'tags.id',
          'hashtag.keyword',
        ])
        .leftJoin('post.author', 'author')
        .leftJoin('post.comments', 'comments')
        .leftJoin('comments.author', 'commentAuthor')
        .leftJoin('post.images', 'images')
        .leftJoin('post.tags', 'tags')
        .leftJoin('tags.hashtag', 'hashtag')
        .where('post.id = :id', { id: postId })
        .getOne();
      return post;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.GET_POST_FAIL);
    }
  }

  async getHotPosts() {
    try {
      const posts = await this.communityLikeRepository
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
      const { title, content } = createPostDto;
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const post = new CommunityEntity();
      post.title = title;
      post.content = content;
      post.author = user;
      return await this.communityRepository.save(post);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.CREATE_POST_FAIL);
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
      console.error(err);
      // throw new InternalServerErrorException(res.msg.CREATE_POST_FAIL);
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
      throw new InternalServerErrorException();
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
    const { content } = createCommentDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.communityRepository.findOne({
      where: { id: postId },
    });
    if (!post) throw new BadRequestException(res.msg.POST_NOT_EXIST);
    try {
      const comment = new CommunityCommentEntity();
      comment.author = user;
      comment.post = post;
      comment.content = content;
      return await this.communityCommentRepository.save(comment);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.CREATE_COMMENT_FAIL);
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

  async uploadImages(post: CommunityEntity, files: Express.Multer.File) {
    const imgUrls = [].map.call(files, (file) => file.location);
    try {
      const result = Promise.all(
        imgUrls.map((imgUrl: string) => {
          const img = new CommunityImageEntity();
          img.post = post;
          img.url = imgUrl;
          return this.communityImageRepository.save(img);
        }),
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.ADD_IMAGE_FAIL);
    }
  }
}
