import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SanchaekEntity } from './sanchaek.entity';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import * as res from '../common/responses/message';
import { SanchaekImageEntity } from 'src/common/entities/sanchaek-image.entity';
import { SanchaekMapEntity } from 'src/common/entities/sanchaek-map.entity';
@Injectable()
export class SanchaekService {
  constructor(
    @InjectRepository(SanchaekEntity)
    private sanchaekRepository: Repository<SanchaekEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(SanchaekImageEntity)
    private sanchaekImageRepository: Repository<SanchaekImageEntity>,
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
