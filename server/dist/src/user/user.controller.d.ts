import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    checkNickname(data: {
        nickname: string;
    }): Promise<void>;
    emailCheck(data: {
        email: string;
    }): Promise<void>;
    signup(createUserDto: CreateUserDto): Promise<{
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
    logout(response: any): Promise<any>;
    getLikedPosts(user: UserEntity): Promise<UserEntity[]>;
    getCommentedPosts(user: UserEntity): Promise<UserEntity[]>;
    isLoggedIn(user: UserEntity, req: any): Promise<void>;
}
