import { Controller, Get, Query } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get()
  async getPosts(@Query('tag') tag: string) {
    return await this.hashtagService.getPosts(tag)
  }
}
