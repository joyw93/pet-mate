import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as res from '../common/responses/message';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private userProfileRepository: Repository<UserProfileEntity>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.nickname',
        'user.email',
        'user.password',
        'user.provider',
      ])
      .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
      .leftJoin('user.profile', 'profile')
      .where('user.email= :email', { email })
      .getOne();

    if (user && user.provider !== 'local') {
      throw new BadRequestException(res.msg.LOGIN_PROVIDER_WRONG);
    }

    if (!user) {
      return null;
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new UnauthorizedException(res.msg.LOGIN_PASSWORD_WRONG);
  }

  async validateGoogleUser(email: string, name: string, accessToken: string) {
    const exUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!exUser) {
      const user = new UserEntity();
      user.email = email;
      user.name = name;
      user.nickname = name;
      user.password = accessToken;
      user.provider = 'google';
      user.active = false;
      const userProfile = new UserProfileEntity();
      user.profile = userProfile;
      return await this.userRepository.save(user);
    } else {
      return exUser;
    }
  }

  async validateKakaoUser(email: string, name: string, accessToken: string) {
    const exUser = await this.userRepository.findOne({
      where: { email },
    });
    if (!exUser) {
      const user = new UserEntity();
      user.email = email;
      user.name = name;
      user.nickname = name;
      user.password = accessToken;
      user.provider = 'kakao';
      user.active = false;
      const userProfile = new UserProfileEntity();
      user.profile = userProfile;
      return await this.userRepository.save(user);
    } else {
      return exUser;
    }
  }
}
