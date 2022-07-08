import { HashtagService } from './hashtag.service';
export declare class HashtagController {
    private readonly hashtagService;
    constructor(hashtagService: HashtagService);
    getPosts(tag: string): Promise<import("./hashtag.entity").HashtagEntity[]>;
}
