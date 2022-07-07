import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
export declare class UserService {
    private userRepository;
    private communityRepository;
    private communityLikeRepository;
    constructor(userRepository: Repository<UserEntity>, communityRepository: Repository<CommunityEntity>, communityLikeRepository: Repository<CommunityLikeEntity>);
    isValidNickname(nickname: string): Promise<void>;
    isValidEmail(email: string): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        nickname: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        posts: CommunityEntity[];
        likes: CommunityLikeEntity[];
        comments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
    }>;
    getLikedPosts(userId: number): Promise<UserEntity[]>;
    getCommentedPosts(userId: number): Promise<UserEntity[]>;
}
