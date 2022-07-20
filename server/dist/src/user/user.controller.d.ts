import { CreateUserDto } from './dto/create-user.dto';
import { SetProfileDto } from './dto/set-profile.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserProfile(user: UserEntity): Promise<UserEntity>;
    checkNickname(data: {
        nickname: string;
    }): Promise<void>;
    emailCheck(data: {
        email: string;
    }): Promise<void>;
    signup(createUserDto: CreateUserDto): Promise<{
        profile: import("../common/entities/user-profile.entity").UserProfileEntity;
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
    login(user: UserEntity): Promise<UserEntity>;
    setProfile(user: UserEntity, imgUrls: string[], setProfileDto: SetProfileDto): Promise<UserEntity>;
    googleLogin(req: any): Promise<void>;
    googleLoginCallback(req: any, res: any): Promise<"no user from google" | {
        message: string;
        user: Express.User;
    }>;
    kakaoLogin(req: any): Promise<void>;
    kakaoLoginCallback(req: any, res: any): Promise<"no user from kakao" | {
        message: string;
        user: any;
    }>;
    logout(response: any): Promise<any>;
    getMyPosts(user: UserEntity): Promise<import("../community/community.entity").CommunityEntity[]>;
    getLikedPosts(user: UserEntity): Promise<import("../community/community.entity").CommunityEntity[]>;
    getCommentedPosts(user: UserEntity): Promise<import("../community/community.entity").CommunityEntity[]>;
    signout(user: UserEntity): Promise<import("typeorm").DeleteResult>;
    isLoggedIn(user: UserEntity, req: any): Promise<void>;
}
