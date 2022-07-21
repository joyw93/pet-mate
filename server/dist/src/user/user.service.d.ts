/// <reference types="passport" />
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { Request, Response } from 'express';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { SetProfileDto } from './dto/set-profile.dto';
import { CommunityEntity } from 'src/community/community.entity';
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
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        posts: CommunityEntity[];
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
        comments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
    }>;
    setProfile(userId: number, setProfileDto: SetProfileDto, imgUrls: string[]): Promise<UserEntity>;
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
