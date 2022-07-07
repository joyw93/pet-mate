import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
export declare class CommunityService {
    private communityRepository;
    private userRepository;
    private communityLikeRepository;
    private communityCommentRepository;
    private hashtagRepository;
    private communityHashtagRepository;
    constructor(communityRepository: Repository<CommunityEntity>, userRepository: Repository<UserEntity>, communityLikeRepository: Repository<CommunityLikeEntity>, communityCommentRepository: Repository<CommunityCommentEntity>, hashtagRepository: Repository<HashtagEntity>, communityHashtagRepository: Repository<CommunityHashtagEntity>);
    getPosts(offset: number, postCount: number): Promise<CommunityEntity[]>;
    getOnePost(postId: number): Promise<CommunityEntity>;
    getHotPosts(): Promise<any[]>;
    createPost(userId: number, createPostDto: CreatePostDto): Promise<CommunityEntity>;
    editPost(postId: number, editPostDto: EditPostDto): Promise<{
        title: string;
        content: string;
        id: number;
        author_id: number;
        author: UserEntity;
        likes: CommunityLikeEntity[];
        comments: CommunityCommentEntity[];
        tags: CommunityHashtagEntity[];
    } & CommunityEntity>;
    deletePost(postId: number): Promise<import("typeorm").DeleteResult>;
    likePost(userId: number, postId: number): Promise<CommunityLikeEntity>;
    getAllComments(postId: number): Promise<CommunityEntity[]>;
    createComment(userId: number, postId: number, createCommentDto: CreateCommentDto): Promise<CommunityCommentEntity>;
    editComment(commentId: number, content: string): Promise<{
        content: string;
        id: number;
        title: string;
        author_id: number;
        post_id: number;
        author: UserEntity;
        post: CommunityEntity;
    } & CommunityCommentEntity>;
    deleteComment(commentId: number): Promise<import("typeorm").DeleteResult>;
}
