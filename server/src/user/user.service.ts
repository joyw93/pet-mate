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
import { Request, Response } from 'express';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { EditProfileDto } from './dto/edit-profile.dto';
import { CommunityEntity } from 'src/community/community.entity';
import { EditAccountDto } from './dto/edit-account.dto';
import { SetProfileDto } from './dto/set-profile.dto';
import * as bcrypt from 'bcrypt';
import * as res from '../common/responses/message';

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
      .select(['user.nickname'])
      .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
      .leftJoin('user.profile', 'profile')
      .where('user.id=:id', { id: userId })
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
        provider: 'local',
        active: true,
        profile: userProfile,
      });
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async setProfile(userId: number, setProfileDto: SetProfileDto) {
    const { nickname } = setProfileDto;
    const userByNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (userByNickname) {
      throw new UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    user.nickname = nickname;
    user.active = true;
    return await this.userRepository.save(user);
  }

  async editProfile(
    userId: number,
    editProfileDto: EditProfileDto,
    imgUrls: string[],
  ) {
    const { nickname, birthday, comment } = editProfileDto;
    const userByNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const userProfile = await this.userProfileRepository.findOne({
      where: { id: user.profileId },
    });
    if (userByNickname && user.nickname !== nickname) {
      throw new UnauthorizedException(res.msg.SIGNUP_REDUNDANT_NICKNAME);
    }
    if (imgUrls.length == 0) {
      userProfile.imageUrl = null;
    } else {
      userProfile.imageUrl = imgUrls[0];
    }
    userProfile.comment = comment;
    userProfile.birth = birthday;
    user.nickname = nickname;
    user.profile = userProfile;
    return await this.userRepository.save(user);
  }

  async editAccount(userId: number, editAccountDto: EditAccountDto) {
    const { currentPassword, newPassword } = editAccountDto;
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
      return res.send('login error');
    } else {
      const user = req.user;
      if (!user.active) {
        return res.redirect(`http://127.0.0.1:800/auth/google`);
      } else {
        return res.redirect(`http://127.0.0.1:800`);
      }
    }
  }

  async kakaoLoginCallback(req: Request, res: Response) {
    if (!req.user) {
      return res.send('login error');
    } else {
      const user = req.user;
      if (!user.active) {
        return res.redirect(`http://127.0.0.1:800/auth/kakao`);
      } else {
        return res.redirect(`http://127.0.0.1:800`);
      }
    }
  }

  async getMyPosts(userId: number) {
    const posts = await this.communityRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title', 'post.content', 'images.url'])
      .leftJoin('post.author', 'author')
      .leftJoin('post.images', 'images')
      .where('author.id = :id', { id: userId })
      .getMany();
    return posts;
  }

  async getLikedPosts(userId: number) {
    const posts = await this.communityRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title', 'post.content', 'images.url'])
      .leftJoin('post.likes', 'likes')
      .leftJoin('post.images', 'images')
      .where('likes.userId = :id', { id: userId })
      .getMany();
    return posts;
  }

  async getCommentedPosts(userId: number) {
    const posts = await this.communityRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title', 'post.content', 'images.url'])
      .leftJoin('post.images', 'images')
      .leftJoin('post.comments', 'comments')
      .leftJoin('comments.author', 'author')
      .where('author.id=:id', { id: userId })
      .getMany();
    return posts;
  }

  async getMyProfile(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.nickname',
        'user.email',
        'user.active',
      ])
      .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
      .leftJoin('user.profile', 'profile')
      .where('user.id= :id', { id: userId })
      .getOne();
    return user;
  }

  async signout(userId: number) {
    return await this.userRepository.delete(userId);
  }
}
