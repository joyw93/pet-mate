import { CommunityHashtagEntity } from 'src/common/entities/community-hashtag.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { CreatePostDto } from 'src/community/dto/create-post.dto';
import { Repository } from 'typeorm';
import { HashtagEntity } from './hashtag.entity';
export declare class HashtagService {
    private communityHashtagRepository;
    private hashtagRepository;
    constructor(communityHashtagRepository: Repository<CommunityHashtagEntity>, hashtagRepository: Repository<HashtagEntity>);
    addTags(post: CommunityEntity, createPostDto: CreatePostDto): Promise<CommunityHashtagEntity[]>;
    getPosts(tag: string): Promise<HashtagEntity[]>;
}
