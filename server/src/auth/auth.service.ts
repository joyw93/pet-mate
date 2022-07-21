import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as res from '../common/responses/message';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
      ])
      .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
      // .addSelect(['likes.post_id'])
      .leftJoin('user.profile', 'profile')
      // .leftJoin('user.likes', 'likes')
      .where('user.email= :email', { email })
      .getOne();
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
    if (exUser) {
      return exUser;
    } else {
      const newUser = await this.userRepository.save({
        email,
        name,
        nickname: name,
        password: accessToken,
      });
      return newUser;
    }
  }
}
