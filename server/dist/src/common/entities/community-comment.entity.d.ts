import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class CommunityCommentEntity {
    id: number;
    content: string;
    createdAt: Date;
    deletedAt: Date | null;
    author: UserEntity;
    post: CommunityEntity;
}
