import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class CommunityCommentEntity {
    id: number;
    title: string;
    content: string;
    author_id: number;
    post_id: number;
    author: UserEntity;
    post: CommunityEntity;
}
