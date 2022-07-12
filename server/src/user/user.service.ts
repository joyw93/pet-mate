import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as res from '../common/responses/message';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async checkNickname(nickname: string) {
    const userByNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (userByNickname) {
      throw new UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
    }
  }

  async checkEmail(email: string) {
    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (userByEmail) {
      throw new UnauthorizedException(res.msg.SIGNUP_REDUNDANT_EMAIL);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, nickname, password } = createUserDto;

    // 이메일 중복확인
    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (userByEmail) {
      throw new UnauthorizedException(res.msg.SIGNUP_REDUNDANT_EMAIL);
    }

    // 닉네임 중복확인
    const userByNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    if (userByNickname) {
      throw new UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
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
      throw new InternalServerErrorException();
    }
  }

  async googleLoginCallback(req: Request, res: Response) {
    if (!req.user) {
      res.send('login error');
      return 'no user from google';
    } else {
      res.redirect('http://127.0.0.1:800');
      return {
        message: 'User info from Google',
        user: req.user,
      };
    }
  }

  async getLikedPosts(userId: number) {
    const posts = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id'])
      .leftJoinAndSelect('user.likes', 'like')
      .leftJoinAndSelect('like.post', 'post')
      .where('user.id = :id', { id: userId })
      .getMany();
    return posts;
  }

  async getCommentedPosts(userId: number) {
    const posts = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.comments', 'comment')
      .where('user.id=:id', { id: userId })
      .getMany();
    return posts;
  }
}
