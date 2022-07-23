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
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { SetProfileDto } from './dto/set-profile.dto';
import { CommunityEntity } from 'src/community/community.entity';
import { SetAccountDto } from './dto/set-account.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private userProfileRepository: Repository<UserProfileEntity>,
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
  ) {}

  async getUserProfile(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.nickname', 'user.email'])
      .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
      .leftJoin('user.profile', 'profile')
      .where('user.id= :id', { id: userId })
      .getOne();
    return user;
  }

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
      const userProfile = new UserProfileEntity();
      const user = await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
        profile: userProfile,
      });
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async setProfile(
    userId: number,
    setProfileDto: SetProfileDto,
    imgUrls: string[],
  ) {
    const { nickname, birthday, comment } = setProfileDto;
    const userByNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    const user = await this.userRepository.findOne({
      relations: ['profile'],
      where: { id: userId },
    });
    if (userByNickname && user.nickname !== nickname) {
      throw new UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
    }
    user.nickname = nickname;
    user.profile.comment = comment;
    user.profile.birth = birthday;
    user.profile.imageUrl = imgUrls[0];
    return await this.userRepository.save(user);
  }

  async setAccount(userId: number, setAccountDto: SetAccountDto) {
    const { currentPassword, newPassword } = setAccountDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.nickname',
        'user.email',
        'user.password',
      ])
      .where('user.id= :id', { id: userId })
      .getOne();
    const isAuthenticated = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isAuthenticated) {
      throw new UnauthorizedException(res.msg.LOGIN_PASSWORD_WRONG);
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;
    return await this.userRepository.save(user);
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

  async kakaoLoginCallback(req, res) {
    if (!req.user) {
      res.send('login error');
      return 'no user from kakao';
    } else {
      res.redirect('http://127.0.0.1:800');
      return {
        message: 'User info from Kakao',
        user: req.user,
      };
    }
  }

  async getMyPosts(userId: number) {
    const posts = await this.communityRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title','post.content','images.url'])
      .leftJoin('post.author', 'author')
      .leftJoin('post.images', 'images')
      .where('author.id = :id', { id: userId })
      .getMany();
    return posts;
  }

  async getLikedPosts(userId: number) {
    const posts = await this.communityRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title','post.content','images.url'])
      .leftJoin('post.likes', 'likes')
      .leftJoin('post.images', 'images')
      .where('likes.userId = :id', { id: userId })
      .getMany();
    return posts;
  }

  async getCommentedPosts(userId: number) {
    const posts = await this.communityRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title','post.content','images.url'])
      .leftJoin('post.images', 'images')
      .leftJoin('post.comments', 'comments')
      .leftJoin('comments.author', 'author')
      .where('author.id=:id', { id: userId })
      .getMany();
    return posts;
  }

  async signout(userId: number) {
    return await this.userRepository.delete(userId);
  }
}
