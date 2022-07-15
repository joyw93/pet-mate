import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'src/common/decorators/user.decorator';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { createConfig, editConfig } from '../common/aws/s3';
import { EditPostDto } from './dto/edit-post.dto';

@Controller('community')
export class CommunityController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly hashtagService: HashtagService,
  ) {}

  @Get()
  async getPosts(
    @Query('offset') offset: number,
    @Query('count') postCount: number,
    @Query('orderBy') orderBy: string,
  ) {
    return await this.communityService.getPosts(
      offset ?? 0,
      postCount ?? 10,
      orderBy ?? 'new',
    );
  }

  @Get('hot-posts')
  async getHotPosts() {
    return await this.communityService.getHotPosts();
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
    return await this.communityService.likePost(user.id, postId);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 3, createConfig))
  async createPost(
    @UploadedFiles() files: Express.Multer.File,
    @User() user: UserEntity,
    @Body() createPostDto: CreatePostDto,
  ) {
    const { hashtags } = createPostDto;
    const post = await this.communityService.createPost(user.id, createPostDto);
    if (hashtags) {
      // 해쉬태그 한개일때 배열화
      const hashtagArr = typeof hashtags === 'string' ? [hashtags] : hashtags;
      await this.hashtagService.addTags(post, hashtagArr);
    }
    if (files) {
      await this.communityService.uploadImages(post, files);
    }
    return post;
  }

  @Patch(':postId')
  @UseInterceptors(FilesInterceptor('images', 3, editConfig))
  async editPost(
    @UploadedFiles() files: Express.Multer.File,
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: UserEntity,
    @Body() editPostDto: EditPostDto,
  ) {
    const { hashtags } = editPostDto;
    const editedPost = await this.communityService.editPost(
      postId,
      editPostDto,
    );
    if (hashtags) {
      // 해쉬태그 한개일때 배열화
      const hashtagArr = typeof hashtags === 'string' ? [hashtags] : hashtags;
      await this.hashtagService.addTags(editedPost, hashtagArr);
    }
    if (files) {
      await this.communityService.uploadImages(editedPost, files);
    }
    return editedPost;
  }

  @Delete(':postId')
  async deletePost(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
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
    return await this.communityService.createComment(
      user.id,
      postId,
      createCommentDto,
    );
  }

  @Patch('comment/:commentId')
  async editComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body('content') commentContent: string,
  ) {
    return await this.communityService.editComment(commentId, commentContent);
  }

  @Delete('comment/:commentId')
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return await this.communityService.deleteComment(commentId);
  }
}
