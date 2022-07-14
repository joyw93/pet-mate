/// <reference types="multer" />
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
export declare class CommunityController {
    private readonly communityService;
    private readonly hashtagService;
    constructor(communityService: CommunityService, hashtagService: HashtagService);
    getPosts(offset: number, postCount: number, orderBy: string): Promise<import("./community.entity").CommunityEntity[]>;
    getHotPosts(): Promise<import("./community.entity").CommunityEntity[]>;
    getOnePost(postId: number): Promise<import("./community.entity").CommunityEntity>;
    likePost(user: UserEntity, postId: number): Promise<import("../common/entities/community-like.entity").CommunityLikeEntity>;
    createPost(files: Express.Multer.File, user: UserEntity, createPostDto: CreatePostDto): Promise<import("./community.entity").CommunityEntity>;
    editPost(postId: number, editPostDto: EditPostDto): Promise<{
        title: string;
        content: string;
        id: number;
        author_id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        author: UserEntity;
        likes: import("../common/entities/community-like.entity").CommunityLikeEntity[];
        comments: import("../common/entities/community-comment.entity").CommunityCommentEntity[];
        tags: import("../common/entities/community-hashtag.entity").CommunityHashtagEntity[];
        images: import("../common/entities/community-image.entity").CommunityImageEntity[];
    } & import("./community.entity").CommunityEntity>;
    deletePost(user: UserEntity, postId: number): Promise<import("typeorm").DeleteResult>;
    getAllComments(postId: number): Promise<import("./community.entity").CommunityEntity[]>;
    createComment(user: UserEntity, postId: number, createCommentDto: CreateCommentDto): Promise<import("../common/entities/community-comment.entity").CommunityCommentEntity>;
    editComment(commentId: number, commentContent: string): Promise<{
        content: string;
        id: number;
        createdAt: Date;
        deletedAt: Date;
        author: UserEntity;
        post: import("./community.entity").CommunityEntity;
    } & import("../common/entities/community-comment.entity").CommunityCommentEntity>;
    deleteComment(commentId: number): Promise<import("typeorm").DeleteResult>;
}
