import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityController {
    private readonly communityService;
    constructor(communityService: CommunityService);
    getAllPosts(): Promise<import("./community.entity").CommunityEntity[]>;
    getOnePost(postId: number): Promise<import("./community.entity").CommunityEntity>;
    likePost(user: UserEntity, postId: number): Promise<import("../common/entities/community-like.entity").CommunityLikeEntity>;
    createPost(user: UserEntity, createPostDto: CreatePostDto): Promise<import("./community.entity").CommunityEntity>;
    deletePost(postId: number): Promise<import("typeorm").DeleteResult>;
    getAllComments(postId: number): Promise<import("./community.entity").CommunityEntity[]>;
    createComment(user: UserEntity, postId: number, createCommentDto: CreateCommentDto): Promise<import("../common/entities/community-comment.entity").CommunityCommentEntity>;
    deleteComment(commentId: number): Promise<import("typeorm").DeleteResult>;
}
