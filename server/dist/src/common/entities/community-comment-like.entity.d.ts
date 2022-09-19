import { UserEntity } from 'src/user/user.entity';
import { CommunityCommentEntity } from './community-comment.entity';
export declare class CommunityCommentLikeEntity {
    id: number;
    userId: number;
    commentId: number;
    comment: CommunityCommentEntity;
    user: UserEntity;
}
