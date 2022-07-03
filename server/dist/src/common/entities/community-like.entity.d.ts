import { CommunityEntity } from 'src/community/community.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class CommunityLikeEntity {
    id: number;
    post: CommunityEntity;
    auth: UserEntity;
}
