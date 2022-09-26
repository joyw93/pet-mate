import { UserEntity } from 'src/user/user.entity';
import { SanchaekCommentEntity } from './sanchaek-comment.entity';
export declare class SanchaekCommentLikeEntity {
    id: number;
    userId: number;
    commentId: number;
    comment: SanchaekCommentEntity;
    user: UserEntity;
}
