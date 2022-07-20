import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { Repository } from 'typeorm';
import { HashtagEntity } from './hashtag.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
export declare class HashtagService {
    private communityHashtagRepository;
    private hashtagRepository;
    private communityRepository;
    private communityLikeRepository;
    constructor(communityHashtagRepository: Repository<CommunityHashtagEntity>, hashtagRepository: Repository<HashtagEntity>, communityRepository: Repository<CommunityEntity>, communityLikeRepository: Repository<CommunityLikeEntity>);
    addTags(post: CommunityEntity, hashtags: string[]): Promise<CommunityHashtagEntity[]>;
    getPosts(keyword: string): Promise<CommunityEntity[]>;
}
