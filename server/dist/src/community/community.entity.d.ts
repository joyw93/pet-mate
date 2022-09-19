import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityImageEntity } from 'src/common/entities/community-image.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class CommunityEntity {
    id: number;
    title: string;
    content: string;
    temporary: boolean;
    authorId: number;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    author: UserEntity;
    likes: CommunityLikeEntity[];
    comments: CommunityCommentEntity[];
    tags: CommunityHashtagEntity[];
    images: CommunityImageEntity[];
}
