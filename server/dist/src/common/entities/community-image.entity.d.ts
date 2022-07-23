import { CommunityEntity } from 'src/community/community.entity';
export declare class CommunityImageEntity {
    id: number;
    url: string;
    postId: number;
    post: CommunityEntity;
}
