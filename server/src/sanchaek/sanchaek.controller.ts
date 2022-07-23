import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createSanchaekConfig, editSanchaekConfig } from 'src/common/aws/s3';
import { User } from 'src/common/decorators/user.decorator';
import { ImageFilePipe } from 'src/common/pipes/image-file.pipe';
import { SanchaekEditPipe } from 'src/common/pipes/sanchaek-edit.pipe';
import { UserEntity } from 'src/user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
import { EditSanchaekDto } from './dto/edit-sanchaek.dto';
import { SanchaekService } from './sanchaek.service';

@Controller('sanchaek')
export class SanchaekController {
  constructor(private readonly sanchaekService: SanchaekService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 3, createSanchaekConfig))
  async createSanchaek(
    @User() user: UserEntity,
    @UploadedFiles(ImageFilePipe) imgUrls: string[],
    @Body() createSanchaekDto: CreateSanchaekDto,
  ) {
    const sanchaek = await this.sanchaekService.createSanchaek(
      user.id,
      createSanchaekDto,
    );
    if (imgUrls) {
      await this.sanchaekService.uploadImages(sanchaek, imgUrls);
    }
  }

  @Patch(':postId')
  @UseInterceptors(FilesInterceptor('images', 3, editSanchaekConfig))
  async editSanchaek(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @UploadedFiles(ImageFilePipe) imgUrls: string[],
    @Body(SanchaekEditPipe) editSanchaekDto: EditSanchaekDto,
  ) {
    const editedSanchaek = await this.sanchaekService.editSanchaek(
      postId,
      editSanchaekDto,
    );
    if (imgUrls) {
      await this.sanchaekService.uploadImages(editedSanchaek, imgUrls);
    }
    return editedSanchaek;
  }

  @Delete(':postId')
  async deleteSanchaek(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return await this.sanchaekService.deleteSanchaek(postId);
  }

  @Get()
  async getSanchaeks() {
    return await this.sanchaekService.getSanchaeks();
  }

  @Get(':postId')
  async getOneSanchaek(@Param('postId', ParseIntPipe) postId: number) {
    return await this.sanchaekService.getOneSanchaek(postId);
  }

  @Post(':postId/comment')
  async addComment(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.sanchaekService.addComment(
      user.id,
      postId,
      createCommentDto,
    );
  }

  @Delete('comment/:commentId')
  async deleteComment(
    @User() user: UserEntity,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.sanchaekService.deleteComment(commentId);
  }
}
