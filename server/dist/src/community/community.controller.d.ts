import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
export declare class CommunityController {
    private readonly communityService;
    constructor(communityService: CommunityService);
    getAllPosts(): Promise<import("./community.entity").CommunityEntity[]>;
    getOnePost(id: number): Promise<import("./community.entity").CommunityEntity>;
    likePost(user: UserEntity, id: number): Promise<import("../common/entities/community-like.entity").CommunityLikeEntity>;
    createPost(user: UserEntity, createPostDto: CreatePostDto): Promise<import("./community.entity").CommunityEntity>;
    deletePost(id: number): Promise<import("typeorm").DeleteResult>;
    getAllComments(id: number): Promise<import("./community.entity").CommunityEntity[]>;
    createComment(user: UserEntity, id: number, createCommentDto: CreateCommentDto): Promise<import("../common/entities/community-comment.entity").CommunityCommentEntity>;
}
