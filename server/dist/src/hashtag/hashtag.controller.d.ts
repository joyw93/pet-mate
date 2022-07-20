import { HashtagService } from './hashtag.service';
export declare class HashtagController {
    private readonly hashtagService;
    constructor(hashtagService: HashtagService);
    getPosts(keyword: string): Promise<import("../community/community.entity").CommunityEntity[]>;
}
