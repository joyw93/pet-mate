import { Controller, Get, Query } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get()
  async getPosts(@Query('keyword') keyword: string) {
    return await this.hashtagService.getPosts(keyword)
  }
}
