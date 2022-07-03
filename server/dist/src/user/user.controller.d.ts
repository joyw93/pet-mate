import { CreateUserDto } from './dto/create-user.dto';
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
        communities: import("../community/community.entity").CommunityEntity[];
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
    }>;
    login(body: any): Promise<any>;
    test(user: any): Promise<void>;
}
