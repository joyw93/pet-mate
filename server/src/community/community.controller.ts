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
  Req,
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
import { createPostConfig, editPostConfig } from '../common/aws/s3';
import { EditPostDto } from './dto/edit-post.dto';
import { HashtagPipe } from 'src/common/pipes/hashtag.pipe';
import { ImageFilePipe } from 'src/common/pipes/image-file.pipe';
import { CommunityEditPipe } from 'src/common/pipes/community-edit.pipe';
import { CommunityCreatePipe } from 'src/common/pipes/community-create.pipe';

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
  @UseInterceptors(FilesInterceptor('images', 3, createPostConfig))
  async createPost(
    @User() user: UserEntity,
    @UploadedFiles(ImageFilePipe) imgUrls: string[],
    @Body(CommunityCreatePipe) createPostDto: CreatePostDto,
  ) {
    const { hashtags } = createPostDto;
    const post = await this.communityService.createPost(user.id, createPostDto);
    if (hashtags) {
      await this.hashtagService.addTags(post, hashtags);
    }
    if (imgUrls) {
      await this.communityService.uploadImages(post, imgUrls);
    }
    return post;
  }

  @Patch(':postId')
  @UseInterceptors(FilesInterceptor('images', 3, editPostConfig))
  async editPost(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @UploadedFiles(ImageFilePipe) imgUrls: string[],
    @Body(CommunityEditPipe) editPostDto: EditPostDto,
  ) {
    const { hashtags } = editPostDto;
    const editedPost = await this.communityService.editPost(
      postId,
      editPostDto,
    );
    if (hashtags) {
      await this.hashtagService.addTags(editedPost, hashtags);
    }
    if (imgUrls) {
      await this.communityService.uploadImages(editedPost, imgUrls);
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
  async addComment(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.communityService.addComment(
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
  async deleteComment(
    @User() user: UserEntity,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.communityService.deleteComment(commentId);
  }
}
