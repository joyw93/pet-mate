import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('post')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @User() user: UserEntity,
  ) {
    const userId = user.id;
    return await this.communityService.createPost(userId, createPostDto);
  }
}

