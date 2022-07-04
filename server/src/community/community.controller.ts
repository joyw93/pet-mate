import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  async getAllPosts() {
    return await this.communityService.getAllPosts()
  }

  @Post('post')
  async createPost(
    @User() user: UserEntity,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = user.id;
    return await this.communityService.createPost(userId, createPostDto);
  }

  @Get('post/:id/like')
  async likePost(@User() user: UserEntity, @Param() param) {
    const userId = user.id;
    const postId = param.id;
    return await this.communityService.likePost(userId, postId);
  }
}
