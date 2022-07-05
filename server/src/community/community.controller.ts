import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  async getAllPosts() {
    return await this.communityService.getAllPosts();
  }

  @Get(':postId')
  async getOnePost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.communityService.getOnePost(postId);
  }

  @Get(':postId/like')
  async likePost(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    const userId = user.id;
    return await this.communityService.likePost(userId, postId);
  }

  @Post()
  async createPost(
    @User() user: UserEntity,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = user.id;
    return await this.communityService.createPost(userId, createPostDto);
  }

  @Patch(':postId')
  async editPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() editPostDto: EditPostDto,
  ) {
    return await this.communityService.editPost(postId, editPostDto);
  }

  // Todo: 인가처리
  @Delete(':postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.communityService.deletePost(postId);
  }

  @Get(':postId/comment')
  async getAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return await this.communityService.getAllComments(postId);
  }

  @Post(':postId/comment')
  async createComment(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = user.id;
    return await this.communityService.createComment(
      userId,
      postId,
      createCommentDto,
    );
  }
  @Delete('comment/:commentId')
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return await this.communityService.deleteComment(commentId);
  }
}
