import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  async getAllPosts() {
    return await this.communityService.getAllPosts();
  }

  @Get('/:id')
  async getOnePost(@Param('id', ParseIntPipe) id: number) {
    const postId = id;
    return await this.communityService.getOnePost(postId);
  }

  @Get('/:id/like')
  async likePost(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = user.id;
    const postId = id;
    return await this.communityService.likePost(userId, postId);
  }

  @Post('post')
  async createPost(
    @User() user: UserEntity,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = user.id;
    return await this.communityService.createPost(userId, createPostDto);
  }
}
