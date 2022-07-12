import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { Request, Response } from 'express';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    checkNickname(nickname: string): Promise<void>;
    checkEmail(email: string): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        nickname: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        posts: import("../community/community.entity").CommunityEntity[];
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
        comments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
    }>;
    googleLoginCallback(req: Request, res: Response): Promise<"no user from google" | {
        message: string;
        user: Express.User;
    }>;
    kakaoLoginCallback(req: any, res: any): Promise<"no user from kakao" | {
        message: string;
        user: any;
    }>;
    getLikedPosts(userId: number): Promise<UserEntity[]>;
    getCommentedPosts(userId: number): Promise<UserEntity[]>;
}
