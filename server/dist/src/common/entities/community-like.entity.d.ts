import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class CommunityLikeEntity {
    id: number;
    userId: number;
    postId: number;
    post: CommunityEntity;
    user: UserEntity;
}
