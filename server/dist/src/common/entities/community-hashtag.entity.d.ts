import { CommunityEntity } from 'src/community/community.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
export declare class CommunityHashtagEntity {
    id: number;
    postId: number;
    tagId: number;
    post: CommunityEntity;
    hashtag: HashtagEntity;
}
