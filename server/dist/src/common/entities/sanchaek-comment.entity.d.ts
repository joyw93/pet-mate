import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import { UserEntity } from 'src/user/user.entity';
import { SanchaekCommentLikeEntity } from './sanchaek-comment-like.entity';
export declare class SanchaekCommentEntity {
    id: number;
    content: string;
    parentId: number;
    depth: number;
    createdAt: Date;
    deletedAt: Date | null;
    author: UserEntity;
    sanchaek: SanchaekEntity;
    likes: SanchaekCommentLikeEntity[];
}
