import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityService {
    private communityRepository;
    private userRepository;
    private communityLikeRepository;
    private communityCommentRepository;
    constructor(communityRepository: Repository<CommunityEntity>, userRepository: Repository<UserEntity>, communityLikeRepository: Repository<CommunityLikeEntity>, communityCommentRepository: Repository<CommunityCommentEntity>);
    getAllPosts(): Promise<CommunityEntity[]>;
    getOnePost(postId: number): Promise<CommunityEntity>;
    createPost(userId: number, createPostDto: CreatePostDto): Promise<CommunityEntity>;
    likePost(userId: number, postId: number): Promise<CommunityLikeEntity>;
    createComment(userId: number, postId: number, createCommentDto: CreateCommentDto): Promise<CommunityCommentEntity>;
}
