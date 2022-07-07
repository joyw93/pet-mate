import { CommunityEntity } from 'src/community/community.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';
export declare class CommunityHashtagEntity {
    id: number;
    post_id: number;
    tag_id: number;
    post: CommunityEntity;
    hashtag: HashtagEntity;
}
