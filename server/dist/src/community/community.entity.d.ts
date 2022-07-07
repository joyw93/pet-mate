import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class CommunityEntity {
    id: number;
    title: string;
    content: string;
    author_id: number;
    author: UserEntity;
    likes: CommunityLikeEntity[];
    comments: CommunityCommentEntity[];
    tags: CommunityHashtagEntity[];
}
