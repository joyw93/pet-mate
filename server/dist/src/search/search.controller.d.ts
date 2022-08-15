import { CommunityService } from 'src/community/community.service';
import { SanchaekService } from 'src/sanchaek/sanchaek.service';
import { SearchService } from './search.service';
export declare class SearchController {
    private readonly communityService;
    private readonly sanchaekService;
    private readonly searchService;
    constructor(communityService: CommunityService, sanchaekService: SanchaekService, searchService: SearchService);
    getSearchPosts(keyword: string): Promise<{
        sanchaekPosts: import("../sanchaek/sanchaek.entity").SanchaekEntity[];
        communityPosts: import("../community/community.entity").CommunityEntity[];
    }>;
}
