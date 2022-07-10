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
import { v4 as uuid } from 'uuid';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'src/common/decorators/user.decorator';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UserEntity } from 'src/user/user.entity';
import { CommunityService } from './community.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

const s3 = new AWS.S3();

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
  ) {
    return await this.communityService.getPosts(offset || 0, postCount);
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
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(
            null,
            `petmate/community/images/${uuid()}${path.extname(
              file.originalname
            )}`,
          );
        },
      }),
    }),
  )
  async createPost(
    @UploadedFiles() files: Express.Multer.File,
    @User() user: UserEntity,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = await this.communityService.createPost(user.id, createPostDto);
    await this.hashtagService.addTags(post, createPostDto);
    await this.communityService.uploadImages(post, files);
    return post;
  }

  @Patch(':postId')
  async editPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() editPostDto: EditPostDto,
  ) {
    return await this.communityService.editPost(postId, editPostDto);
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
