import { Controller, Get, Query } from '@nestjs/common';
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

  @Get()
  async getSearchPosts(@Query('keyword') keyword: string) {
    const communityPosts = await this.communityService.getSearchPosts(keyword);
    const sanchaekPosts = await this.sanchaekService.getSearchSanchaeks(keyword);
    const posts = { sanchaekPosts, communityPosts };
    return posts;
  }
}
