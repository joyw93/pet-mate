import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class CommunityLikeEntity {
    id: number;
    author_id: number;
    post_id: number;
    post: CommunityEntity;
    author: UserEntity;
}