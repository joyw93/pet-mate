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
import * as res from '../common/responses/message';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SanchaekCommentEntity } from 'src/common/entities/sanchaek-comment.entity';
import { EditSanchaekDto } from './dto/edit-sanchaek.dto';
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
    private sanchaekCommentRepository: Repository<SanchaekCommentEntity>
  ) {}

  async createSanchaek(userId: number, createSanchaekDto: CreateSanchaekDto) {
    try {
      const { title, content, mapInfo } = createSanchaekDto;
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const sanchaek = new SanchaekEntity();
      sanchaek.title = title;
      sanchaek.content = content;
      sanchaek.user = user;
      const { lat, lng, location, address, roadAddress } = mapInfo;
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
    const { title, content, images } = editSanchaekDto;
    try {
      const oldSanchaek = await this.sanchaekRepository.findOne({
        where: { id: sanchaekId },
      });
      const newSanchaek = { ...oldSanchaek, title, content };

      const savedImages = await this.sanchaekImageRepository.find({
        where: {  sanchaekId },
      });

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

  async getSanchaeks() {
    try {
      const sanchaeks = this.sanchaekRepository
        .createQueryBuilder('sanchaek')
        .select(['sanchaek.id', 'sanchaek.title','sanchaek.content','sanchaek.createdAt'])
        .addSelect(['user.nickname'])
        .addSelect(['images.url'])
        .leftJoin('sanchaek.images', 'images')
        .leftJoinAndSelect('sanchaek.mapInfo', 'map')
        .leftJoin('sanchaek.user', 'user')
        .getMany();

      return sanchaeks;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
    }
  }

  async getOneSanchaek(postId: number) {
    const sanchaek = await this.sanchaekRepository.findOne({
      where: { id: postId },
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
        .select(['sanchaek.id', 'sanchaek.title','sanchaek.content','sanchaek.createdAt','sanchaek.views'])
        .addSelect(['user.nickname'])
        .addSelect(['images.url'])
        .addSelect(['comments.content','comments.id'])
        .addSelect(['author.nickname'])
        .leftJoin('sanchaek.comments','comments')
        .leftJoin('comments.author','author')
        .leftJoin('sanchaek.images', 'images')
        .leftJoinAndSelect('sanchaek.mapInfo', 'map')
        .leftJoin('sanchaek.user', 'user')
        .where('sanchaek.id= :id', { id: postId })
        .getOne();
      return sanchaek;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(res.msg.SANCHAEK_GET_POST_FAIL);
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
