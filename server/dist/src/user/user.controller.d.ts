import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    nicknameCheck(body: any): Promise<void>;
    emailCheck(body: any): Promise<void>;
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
    logout(res: any): Promise<any>;
    getLikedPosts(user: UserEntity): Promise<UserEntity[]>;
    getCommentedPosts(user: UserEntity): Promise<UserEntity[]>;
    isLoggedIn(user: any): Promise<void>;
}
