import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SanchaekEntity } from './sanchaek.entity';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SanchaekCommentEntity } from 'src/common/entities/sanchaek-comment.entity';
import { EditSanchaekDto } from './dto/edit-sanchaek.dto';
import * as res from '../common/responses/message';
import { SanchaekLikeEntity } from 'src/common/entities/sanchaek-like.entity';
import { SanchaekCommentLikeEntity } from 'src/common/entities/sanchaek-comment-like.entity';
@Injectable()
export class SanchaekService {
  constructor(
    @InjectRepository(SanchaekEntity)
    private sanchaekRepository: Repository<SanchaekEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(SanchaekImageEntity)
    private sanchaekImageRepository: Repository<SanchaekImageEntity>,
    @InjectRepository(SanchaekCommentEntity)
    private sanchaekCommentRepository: Repository<SanchaekCommentEntity>,
    @InjectRepository(SanchaekMapEntity)
    private sanchaekMapRepository: Repository<SanchaekMapEntity>,
    @InjectRepository(SanchaekLikeEntity)
    private sanchaekLikeRepository: Repository<SanchaekLikeEntity>,
    @InjectRepository(SanchaekCommentLikeEntity)
    private sanchaekCommentLikeRepository: Repository<SanchaekCommentLikeEntity>,
  ) {}

  async getSanchaeks(offset: number, sanchaekCount: number) {
    try {
      const likeCount = this.sanchaekLikeRepository
        .createQueryBuilder()
        .subQuery()
        .select(['sanchaekId', 'COUNT(likes.userId) AS likeCount'])
        .from(SanchaekLikeEntity, 'likes')
        .groupBy('sanchaekId')
        .getQuery();
      const sanchaeks = this.sanchaekRepository
        .createQueryBuilder('sanchaek')
        .select([
          'sanchaek.id',
          'sanchaek.title',
          'sanchaek.content',
          'sanchaek.createdAt',
          'sanchaek.views',
          'user.nickname',
          'profile.imageUrl',
          'images.url',
          'LikeCount.likeCount',
        ])
        .leftJoin('sanchaek.user', 'user')
        .leftJoin('user.profile', 'profile')
        .leftJoin('sanchaek.images', 'images')
        .leftJoinAndSelect('sanchaek.mapInfo', 'map')
        .leftJoin(likeCount, 'LikeCount', 'LikeCount.sanchaekId = sanchaek.id')
        .loadRelationCountAndMap('sanchaek.likeCount', 'sanchaek.likes')
        .loadRelationCountAndMap('sanchaek.commentCount', 'sanchaek.comments')
        .skip(offset)
        .take(sanchaekCount)
        .orderBy({ 'sanchaek.createdAt': 'DESC' })
        .getMany();

      return sanchaeks;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
    }
  }

  async getSearchSanchaeks(keyword: string) {
    const likeCount = this.sanchaekLikeRepository
      .createQueryBuilder()
      .subQuery()
      .select(['sanchaekId', 'COUNT(likes.userId) AS likeCount'])
      .from(SanchaekLikeEntity, 'likes')
      .groupBy('sanchaekId')
      .getQuery();
    const sanchaeks = this.sanchaekRepository
      .createQueryBuilder('sanchaek')
      .select([
        'sanchaek.id',
        'sanchaek.title',
        'sanchaek.content',
        'sanchaek.createdAt',
        'sanchaek.views',
        'user.nickname',
        'profile.imageUrl',
        'images.url',
        'LikeCount.likeCount',
      ])
      .leftJoin('sanchaek.images', 'images')
      .leftJoin('sanchaek.user', 'user')
      .leftJoin('user.profile','profile')
      .leftJoinAndSelect('sanchaek.mapInfo', 'map')
      .leftJoin(likeCount, 'LikeCount', 'LikeCount.sanchaekId = sanchaek.id')
      .loadRelationCountAndMap('sanchaek.likeCount', 'sanchaek.likes')
      .loadRelationCountAndMap('sanchaek.commentCount', 'sanchaek.comments')
      .where('sanchaek.title like :keyword', { keyword: `%${keyword}%` })
      .orWhere('sanchaek.content like :keyword', { keyword: `%${keyword}%` })
      .orWhere('map.location like :keyword', { keyword: `%${keyword}%` })
      .orWhere('map.address like :keyword', { keyword: `%${keyword}%` })
      .orWhere('map.roadAddress like :keyword', { keyword: `%${keyword}%` })
      .getMany();
    return sanchaeks;
  }

  async getOneSanchaek(sanchaekId: number) {
    const sanchaek = await this.sanchaekRepository.findOne({
      where: { id: sanchaekId },
    });
    if (!sanchaek) {
      throw new NotFoundException(res.msg.SANCHAEK_POST_NOT_EXIST);
    } else {
      sanchaek.views++;
      await this.sanchaekRepository.save(sanchaek);
    }
    try {
      const sanchaek = await this.sanchaekRepository
        .createQueryBuilder('sanchaek')
        .select([
          'sanchaek.id',
          'sanchaek.title',
          'sanchaek.content',
          'sanchaek.createdAt',
          'sanchaek.views',
        ])
        .addSelect(['user.nickname', 'user.id'])
        .addSelect(['images.id', 'images.url'])
        .addSelect([
          'comments.id',
          'comments.depth',
          'comments.parentId',
          'comments.content',
          'comments.createdAt',
        ])
        .addSelect(['commentAuthor.nickname', 'commentAuthor.id'])
        .addSelect(['commentAuthorProfile.imageUrl', 'commentAuthorProfile.id'])
        .addSelect(['userProfile.id', 'userProfile.imageUrl'])
        .addSelect(['likes.userId'])
        .leftJoin('sanchaek.comments', 'comments')
        .leftJoin('comments.author', 'commentAuthor')
        .leftJoin('commentAuthor.profile', 'commentAuthorProfile')
        .leftJoin('sanchaek.images', 'images')
        .leftJoinAndSelect('sanchaek.mapInfo', 'map')
        .leftJoin('sanchaek.user', 'user')
        .leftJoin('sanchaek.likes', 'likes')
        .leftJoin('user.profile', 'userProfile')
        .loadRelationCountAndMap('sanchaek.likeCount', 'sanchaek.likes')
        .where('sanchaek.id= :id', { id: sanchaekId })
        .getOne();
      return sanchaek;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
    }
  }

  async getHotSanchaeks() {
    try {
      const sanchaeks = await this.sanchaekRepository
        .createQueryBuilder('sanchaek')
        .select([
          'sanchaek.title',
          'sanchaek.id',
          'sanchaek.createdAt',
          'sanchaek.views',
        ])
        .addSelect(['images.url'])
        .addSelect(['user.nickname'])
        .leftJoin('sanchaek.images', 'images')
        .leftJoin('sanchaek.user', 'user')
        .leftJoinAndSelect('sanchaek.mapInfo', 'mapInfo')
        .take(4)
        .getMany();
      return sanchaeks;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
    }
  }

  async likeSanchaek(userId: number, sanchaekId: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const sanchaek = await this.sanchaekRepository.findOne({
        where: { id: sanchaekId },
      });
      const sanchaekLike = await this.sanchaekLikeRepository.findOne({
        where: { userId, sanchaekId },
      });
      if (sanchaekLike) {
        await this.sanchaekLikeRepository.remove(sanchaekLike);
        return 'unlike';
      } else {
        const sanchaekLike = new SanchaekLikeEntity();
        sanchaekLike.user = user;
        sanchaekLike.sanchaek = sanchaek;
        await this.sanchaekLikeRepository.save(sanchaekLike);
        return 'like';
      }
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.COMMUNITY_LIKE_FAIL);
    }
  }

  async likeComment(userId: number, commentId: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const comment = await this.sanchaekCommentRepository.findOne({
        where: { id: commentId },
      });
      const commentLike = await this.sanchaekCommentLikeRepository.findOne({
        where: { userId, commentId },
      });
      if (commentLike) {
        await this.sanchaekCommentLikeRepository.remove(commentLike);
        return 'unlike';
      } else {
        const commentLike = new SanchaekCommentLikeEntity();
        commentLike.user = user;
        commentLike.comment = comment;
        await this.sanchaekCommentLikeRepository.save(commentLike);
        return 'like';
      }
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.COMMUNITY_LIKE_FAIL);
    }
  }

  async createSanchaek(userId: number, createSanchaekDto: CreateSanchaekDto) {
    try {
      const { title, content, mapInfo } = createSanchaekDto;
      const { lat, lng, location, address, roadAddress } = mapInfo;

      const user = await this.userRepository.findOne({ where: { id: userId } });

      const sanchaek = new SanchaekEntity();
      sanchaek.title = title;
      sanchaek.content = content;
      sanchaek.user = user;

      const sanchaekMap = new SanchaekMapEntity();
      sanchaekMap.lat = lat;
      sanchaekMap.lng = lng;
      sanchaekMap.location = location;
      sanchaekMap.address = address;
      sanchaekMap.roadAddress = roadAddress;

      sanchaek.mapInfo = sanchaekMap;
      return await this.sanchaekRepository.save(sanchaek);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_POST_NOT_EXIST);
    }
  }

  async createTemporarySanchaek(userId: number, createSanchaekDto: CreateSanchaekDto) {
    try {
      const { title, content, mapInfo } = createSanchaekDto;
      const { lat, lng, location, address, roadAddress } = mapInfo;

      const user = await this.userRepository.findOne({ where: { id: userId } });

      const sanchaek = new SanchaekEntity();
      sanchaek.title = title;
      sanchaek.content = content;
      sanchaek.user = user;
      sanchaek.temporary = true;

      const sanchaekMap = new SanchaekMapEntity();
      sanchaekMap.lat = lat;
      sanchaekMap.lng = lng;
      sanchaekMap.location = location;
      sanchaekMap.address = address;
      sanchaekMap.roadAddress = roadAddress;

      sanchaek.mapInfo = sanchaekMap;
      return await this.sanchaekRepository.save(sanchaek);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_POST_NOT_EXIST);
    }
  }

  async editSanchaek(sanchaekId: number, editSanchaekDto: EditSanchaekDto) {
    const { title, content, mapInfo, images } = editSanchaekDto;
    const { lat, lng, location, address, roadAddress } = mapInfo;
    try {
      const sanchaek = await this.sanchaekRepository.findOne({
        where: { id: sanchaekId },
      });
      const newSanchaek = { ...sanchaek, title, content };

      const savedImages = await this.sanchaekImageRepository.find({
        where: { sanchaekId },
      });

      const sanchaekMap = await this.sanchaekMapRepository.findOne({
        where: { id: sanchaek.mapId },
      });

      if (sanchaekMap) {
        sanchaekMap.lat = lat;
        sanchaekMap.lng = lng;
        sanchaekMap.location = location;
        sanchaekMap.address = address;
        sanchaekMap.roadAddress = roadAddress;
      } else {
        const sanchaekMap = new SanchaekMapEntity();
        sanchaekMap.lat = lat;
        sanchaekMap.lng = lng;
        sanchaekMap.location = location;
        sanchaekMap.address = address;
        sanchaekMap.roadAddress = roadAddress;
      }

      newSanchaek.mapInfo = sanchaekMap;

      if (images) {
        const imagesToDelete = savedImages.filter(
          (savedImage) => !images.includes(savedImage.url),
        );
        await this.sanchaekImageRepository.remove(imagesToDelete);
      } else {
        await this.sanchaekImageRepository.delete({ sanchaekId });
      }

      return await this.sanchaekRepository.save(newSanchaek);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_EDIT_POST_FAIL);
    }
  }

  async deleteSanchaek(sanchaekId: number) {
    try {
      return await this.sanchaekRepository.delete(sanchaekId);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_DELETE_POST_FAIL);
    }
  }

  async addComment(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const { content } = createCommentDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const sanchaek = await this.sanchaekRepository.findOne({
      where: { id: postId },
    });
    if (!sanchaek)
      throw new BadRequestException(res.msg.SANCHAEK_POST_NOT_EXIST);
    try {
      const comment = new SanchaekCommentEntity();
      comment.author = user;
      comment.sanchaek = sanchaek;
      comment.content = content;
      return await this.sanchaekCommentRepository.save(comment);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        res.msg.SANCHAEK_CREATE_COMMENT_FAIL,
      );
    }
  }

  async deleteComment(commentId: number) {
    try {
      return await this.sanchaekCommentRepository.delete(commentId);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        res.msg.SANCHAEK_COMMENT_DELETE_FAIL,
      );
    }
  }

  async uploadImages(sanchaek: SanchaekEntity, imgUrls: string[]) {
    try {
      const result = await Promise.all(
        imgUrls.map((imgUrl: string) => {
          const image = new SanchaekImageEntity();
          image.sanchaek = sanchaek;
          image.url = imgUrl;
          return this.sanchaekImageRepository.save(image);
        }),
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_ADD_IMAGE_FAIL);
    }
  }
}
