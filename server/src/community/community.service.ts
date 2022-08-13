import * as AWS from 'aws-sdk';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { CommunityImageEntity } from 'src/common/entities/community-image.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import * as res from '../common/responses/message';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private userProfileRepository: Repository<UserProfileEntity>,
    @InjectRepository(CommunityLikeEntity)
    private communityLikeRepository: Repository<CommunityLikeEntity>,
    @InjectRepository(CommunityCommentEntity)
    private communityCommentRepository: Repository<CommunityCommentEntity>,
    @InjectRepository(CommunityImageEntity)
    private communityImageRepository: Repository<CommunityImageEntity>,
    @InjectRepository(CommunityHashtagEntity)
    private communityHashtagRepository: Repository<CommunityHashtagEntity>,
    @InjectRepository(HashtagEntity)
    private hashtagRepository: Repository<HashtagEntity>,
  ) {}

  async getPosts(offset: number, postCount: number, orderBy: string) {
    let cond;
    if (orderBy === 'new') {
      cond = { 'post.createdAt': 'DESC' };
    } else if (orderBy === 'old') {
      cond = { 'post.createdAt': 'ASC' };
    } else if (orderBy === 'like') {
      cond = { likeCount: 'DESC' };
    } else if (orderBy === 'views') {
      cond = { 'post.views': 'DESC' };
    }
    try {
      const likeCount = this.communityLikeRepository
        .createQueryBuilder()
        .subQuery()
        .select(['postId', 'COUNT(likes.userId) AS likeCount'])
        .from(CommunityLikeEntity, 'likes')
        .groupBy('postId')
        .getQuery();
      const posts = this.communityRepository
        .createQueryBuilder('post')
        .select([
          'post.id',
          'post.title',
          'post.content',
          'post.createdAt',
          'post.views',
          'author.nickname',
          'profile.imageUrl',
          'images.url',
          'tags.id',
          'hashtag.keyword',
          'LikeCount.likeCount',
        ])
        .leftJoin('post.author', 'author')
        .leftJoin('author.profile', 'profile')
        .leftJoin('post.images', 'images')
        .leftJoin('post.tags', 'tags')
        .leftJoin('post.likes', 'likes')
        .leftJoin('tags.hashtag', 'hashtag')
        .leftJoin(likeCount, 'LikeCount', 'LikeCount.postId = post.id')
        .loadRelationCountAndMap('post.likeCount', 'post.likes')
        .loadRelationCountAndMap('post.commentCount', 'post.comments')
        .skip(offset)
        .take(postCount)
        .orderBy(cond)
        .getMany();
      return posts;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.COMMUNITY_GET_POST_FAIL);
    }
  }

  async getSearchPosts(keyword: string) {
    const posts = this.communityRepository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.createdAt',
        'post.views',
        'author.nickname',
        'images.id',
        'images.url',
      ])
      .leftJoin('post.images', 'images')
      .leftJoin('post.author', 'author')
      .leftJoin('post.tags', 'tags')
      .leftJoin('tags.hashtag', 'hashtag')
      .where('post.title like :keyword', { keyword: `%${keyword}%` })
      .orWhere('post.content like :keyword', { keyword: `%${keyword}%` })
      .orWhere('hashtag.keyword like :keyword', { keyword: `%${keyword}%` })
      .getMany();
    return posts;
  }

  async getOnePost(postId: number) {
    const post = await this.communityRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(res.msg.COMMUNITY_POST_NOT_EXIST);
    } else {
      // 게시물 조회수 1 증가
      post.views++;
      await this.communityRepository.save(post);
    }
    try {
      const post = await this.communityRepository
        .createQueryBuilder('post')
        .select([
          'post.id',
          'post.title',
          'post.content',
          'post.createdAt',
          'post.views',
          'author.nickname',
          'author.id',
          'authorProfile.id',
          'authorProfile.imageUrl',
          'images.id',
          'images.url',
          'comments.id',
          'comments.content',
          'comments.createdAt',
          'commentAuthor.id',
          'commentAuthor.nickname',
          'commentAuthorProfile.imageUrl',
          'commentAuthorProfile.id',
          'likes.userId',
          'tags.id',
          'hashtag.keyword',
        ])
        .leftJoin('post.author', 'author')
        .leftJoin('author.profile', 'authorProfile')
        .leftJoin('post.comments', 'comments')
        .leftJoin('comments.author', 'commentAuthor')
        .leftJoin('commentAuthor.profile', 'commentAuthorProfile')
        .leftJoin('post.images', 'images')
        .leftJoin('post.tags', 'tags')
        .leftJoin('post.likes', 'likes')
        .leftJoin('tags.hashtag', 'hashtag')
        .loadRelationCountAndMap('post.likeCount', 'post.likes')
        .where('post.id = :id', { id: postId })
        .getOne();
      return post;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.COMMUNITY_GET_POST_FAIL);
    }
  }

  async getHotPosts() {
    try {
      const posts = await this.communityRepository
        .createQueryBuilder('post')
        .select(['post.id', 'post.title', 'post.createdAt', 'post.views'])
        .addSelect(['images.url'])
        .addSelect(['author.nickname'])
        .leftJoin('post.images', 'images')
        .leftJoin('post.author', 'author')
        .take(4)
        .orderBy({ 'post.views': 'DESC' })
        .getMany();
      return posts;
    } catch (err) {
      throw new InternalServerErrorException(res.msg.COMMUNITY_GET_POST_FAIL);
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
      throw new InternalServerErrorException(
        res.msg.COMMUNITY_CREATE_POST_FAIL,
      );
    }
  }

  async editPost(userId: number, postId: number, editPostDto: EditPostDto) {
    const { title, content, images } = editPostDto;
    const post = await this.communityRepository.findOne({
      where: { id: postId },
    });
    if (post.authorId !== userId) {
      throw new ForbiddenException(res.msg.COMMUNITY_FORBIDDEN_REQUEST);
    }
    try {
      const newPost = { ...post, title, content };
      const savedImages = await this.communityImageRepository.find({
        where: { postId },
      });

      const savedHashtags = await this.communityHashtagRepository.find({
        where: { postId },
      });

      if (savedHashtags) {
        await this.communityHashtagRepository.remove(savedHashtags);
      }

      if (savedImages.length === 0)
        return await this.communityRepository.save(newPost);

      if (images) {
        // 남길 이미지 있는 경우
        const imagesToDelete = savedImages.filter(
          (savedImage) => !images.includes(savedImage.url),
        );
        await this.communityImageRepository.remove(imagesToDelete);
      } else {
        // 남길 이미지 없는 경우
        await this.communityImageRepository.delete({ postId });
      }

      return await this.communityRepository.save(newPost);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.COMMUNITY_EDIT_POST_FAIL);
    }
  }

  async deletePost(userId: number, postId: number) {
    const post = await this.communityRepository.findOne({
      where: { id: postId },
    });
    if (post.authorId !== userId) {
      throw new ForbiddenException(res.msg.COMMUNITY_FORBIDDEN_REQUEST);
    }
    try {
      return await this.communityRepository.remove(post);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        res.msg.COMMUNITY_DELETE_POST_FAIL,
      );
    }
  }

  async likePost(userId: number, postId: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const post = await this.communityRepository.findOne({
        where: { id: postId },
      });
      const communityLike = await this.communityLikeRepository.findOne({
        where: { userId, postId },
      });
      if (communityLike) {
        await this.communityLikeRepository.remove(communityLike);
        return 'unlike';
      } else {
        const communityLike = new CommunityLikeEntity();
        communityLike.user = user;
        communityLike.post = post;
        await this.communityLikeRepository.save(communityLike);
        return 'like';
      }
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.COMMUNITY_LIKE_FAIL);
    }
  }

  async addComment(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const { content } = createCommentDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const userProfile = await this.userProfileRepository.findOne({
      where: { id: user.profileId },
    });
    const post = await this.communityRepository.findOne({
      where: { id: postId },
    });
    if (!post) throw new BadRequestException(res.msg.COMMUNITY_POST_NOT_EXIST);
    try {
      const comment = new CommunityCommentEntity();
      comment.author = user;
      comment.post = post;
      comment.content = content;
      comment.author.profile = userProfile;
      return await this.communityCommentRepository.save(comment);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        res.msg.COMMUNITY_CREATE_COMMENT_FAIL,
      );
    }
  }

  async editComment(commentId: number, content: string) {
    try {
      const comment = await this.communityCommentRepository.findOne({
        where: { id: commentId },
      });
      const newComment = { ...comment, content };
      return await this.communityCommentRepository.save(newComment);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        res.msg.COMMUNITY_COMMENT_EDIT_FAIL,
      );
    }
  }

  async deleteComment(userId: number, commentId: number) {
    const comment = await this.communityCommentRepository.findOne({
      relations: ['author'],
      where: { id: commentId },
    });
    if (comment.author.id !== userId) {
      throw new ForbiddenException(res.msg.COMMUNITY_FORBIDDEN_REQUEST);
    }
    try {
      return await this.communityCommentRepository.delete(commentId);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        res.msg.COMMUNITY_COMMENT_DELETE_FAIL,
      );
    }
  }

  async uploadImages(post: CommunityEntity, imgUrls: string[]) {
    try {
      const result = await Promise.all(
        imgUrls.map((imgUrl: string) => {
          const image = new CommunityImageEntity();
          image.post = post;
          image.url = imgUrl;
          return this.communityImageRepository.save(image);
        }),
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.COMMUNITY_ADD_IMAGE_FAIL);
    }
  }
}
