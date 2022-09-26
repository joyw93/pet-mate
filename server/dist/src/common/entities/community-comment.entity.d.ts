import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommunityCommentLikeEntity } from './community-comment-like.entity';
export declare class CommunityCommentEntity {
    id: number;
    content: string;
    parentId: number;
    depth: number;
    createdAt: Date;
    deletedAt: Date | null;
    author: UserEntity;
    post: CommunityEntity;
    likes: CommunityCommentLikeEntity[];
}
