import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { Request, Response } from 'express';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { SetProfileDto } from './dto/set-profile.dto';
import { CommunityEntity } from 'src/community/community.entity';
import { SetAccountDto } from './dto/set-account.dto';
export declare class UserService {
    private userRepository;
    private userProfileRepository;
    private communityRepository;
    constructor(userRepository: Repository<UserEntity>, userProfileRepository: Repository<UserProfileEntity>, communityRepository: Repository<CommunityEntity>);
    getUserProfile(userId: number): Promise<UserEntity>;
    checkNickname(nickname: string): Promise<void>;
    checkEmail(email: string): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<{
        profile: UserProfileEntity;
        email: string;
        name: string;
        nickname: string;
        id: number;
        profileId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        posts: CommunityEntity[];
        sanchaeks: import("../sanchaek/sanchaek.entity").SanchaekEntity[];
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
        communityComments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
        sanchaekComments: import("../common/entities/sanchaek-comment.entity").SanchaekCommentEntity[];
    }>;
    setProfile(userId: number, setProfileDto: SetProfileDto, imgUrls: string[]): Promise<UserEntity>;
    setAccount(userId: number, setAccountDto: SetAccountDto): Promise<UserEntity>;
    googleLoginCallback(req: Request, res: Response): Promise<"no user from google" | {
        message: string;
        user: Express.User;
    }>;
    kakaoLoginCallback(req: any, res: any): Promise<"no user from kakao" | {
        message: string;
        user: any;
    }>;
    getMyPosts(userId: number): Promise<CommunityEntity[]>;
    getLikedPosts(userId: number): Promise<CommunityEntity[]>;
    getCommentedPosts(userId: number): Promise<CommunityEntity[]>;
    signout(userId: number): Promise<import("typeorm").DeleteResult>;
}
