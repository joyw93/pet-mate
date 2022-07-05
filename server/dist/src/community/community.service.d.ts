import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityService {
    private communityRepository;
    private userRepository;
    private communityLikeRepository;
    constructor(communityRepository: Repository<CommunityEntity>, userRepository: Repository<UserEntity>, communityLikeRepository: Repository<CommunityLikeEntity>);
    getAllPosts(): Promise<CommunityEntity[]>;
    getOnePost(postId: number): Promise<CommunityEntity>;
    createPost(userId: number, createPostDto: CreatePostDto): Promise<CommunityEntity>;
    likePost(userId: number, postId: number): Promise<CommunityLikeEntity>;
}
