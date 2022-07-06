import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { CommunityEntity } from 'src/community/community.entity';
export declare class UserEntity {
    id: number;
    name: string;
    nickname: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    posts: CommunityEntity[];
    likes: CommunityLikeEntity[];
    comments: CommunityCommentEntity[];
}
