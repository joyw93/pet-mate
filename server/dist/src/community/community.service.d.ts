import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityService {
    private communityRepository;
    private UserRepository;
    private CommunityLikeRepository;
    constructor(communityRepository: Repository<CommunityEntity>, UserRepository: Repository<UserEntity>, CommunityLikeRepository: Repository<CommunityLikeEntity>);
    createPost(userId: number, createPostDto: CreatePostDto): Promise<CommunityEntity>;
    likePost(userId: number, postId: number): Promise<CommunityLikeEntity>;
}
