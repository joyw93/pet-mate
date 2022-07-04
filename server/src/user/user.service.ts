import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CommunityEntity } from 'src/community/community.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
    @InjectRepository(CommunityLikeEntity)
    private communityLikeRepository: Repository<CommunityLikeEntity>,
  ) {}

  async isValidNickname(nickname: string) {
    const userByNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (userByNickname) {
      throw new UnauthorizedException('해당 닉네임은 이미 존재합니다.');
    }
  }

  async isValidEmail(email: string) {
    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (userByEmail) {
      throw new UnauthorizedException('해당 이메일은 이미 존재합니다.');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, nickname, password } = createUserDto;

    // 이메일 중복확인
    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (userByEmail) {
      throw new UnauthorizedException('해당 이메일은 이미 존재합니다.');
    }

    // 닉네임 중복확인
    const userByNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (userByNickname) {
      throw new UnauthorizedException('해당 닉네임은 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const user = await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getLikedPosts(userId: number) {
    const posts = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id'])
      .leftJoinAndSelect('user.likes', 'like')
      .leftJoinAndSelect('like.post', 'post')
      .where('user.id = :id', { id: userId })
      .getMany();
    return posts;
  }
}
