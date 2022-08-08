import { Controller, Get } from '@nestjs/common';
import { CommunityService } from 'src/community/community.service';
import { SanchaekService } from 'src/sanchaek/sanchaek.service';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly sanchaekService: SanchaekService,
    private readonly searchService: SearchService,
  ) {}

//   @Get()
//   async getSearchPosts() {
//     const communityPosts = await this.communityService.getPosts();
//     const sanchaeks = await this.sanchaekService.getSanchaeks();
//     const posts = { sanchaeks, communityPosts };
//     return posts;
//   }
}
