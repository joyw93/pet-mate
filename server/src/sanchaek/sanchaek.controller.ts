import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createSanchaekConfig } from 'src/common/aws/s3';
import { User } from 'src/common/decorators/user.decorator';
import { ImageFilePipe } from 'src/common/pipes/image-file.pipe';
import { UserEntity } from 'src/user/user.entity';
import { CreateSanchaekDto } from './dto/create-sanchaek.dto';
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
}
