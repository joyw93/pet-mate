import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class SanchaekCommentEntity {
    id: number;
    content: string;
    createdAt: Date;
    deletedAt: Date | null;
    author: UserEntity;
    sanchaek: SanchaekEntity;
}
